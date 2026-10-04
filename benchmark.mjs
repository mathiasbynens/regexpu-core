// Benchmarks for regexpu-core
//
//     node --expose-gc --experimental-bench --bench benchmark.mjs
//
// `--expose-gc` is optional but reduces noise: garbage is collected before
// each sample instead of during it. Other runner options can be appended, e.g.
// `--bench-name-pattern=unicodeSets` or `--bench-reporter=json`.

import { bench, suite } from 'node:bench';
import rewritePattern from './rewrite-pattern.js';

// Fast operations are repeated within each sample until the sample takes at
// least this long, so that timer reads and per-sample overhead don't dominate
// the result.
const TARGET_SAMPLE_NS = 10_000_000n; // 10 ms
const MAX_REPEAT = 1 << 20;

// Each benchmark takes up to `MAX_SAMPLES` measured samples, but stops early
// via `context.done()` once it has `MIN_SAMPLES` and has spent
// `TIME_BUDGET_NS` in measured regions. This keeps the slowest benchmarks
// (hundreds of milliseconds per sample) from dominating the run.
const MAX_SAMPLES = 15;
const MIN_SAMPLES = 5;
const TIME_BUDGET_NS = 1_000_000_000n; // 1 s

// Declares one benchmark per case. Each case is `[pattern, flags, options]`;
// the benchmark measures `rewritePattern(pattern, flags, options)`.
//
// The length of the output is summed over all repetitions and checked after
// each sample, so the work can't be optimized away.
//
// The warmup invocation calibrates how often `rewritePattern` is repeated per
// sample by doubling the repeat count until a batch reaches
// `TARGET_SAMPLE_NS`. When warmup is disabled (`--bench-warmup=0`), the first
// measured sample calibrates instead. Every sample's `detail` records the
// repeat count.
const benchEach = (name, cases) => {
	for (const [pattern, flags, options] of cases) {
		const run = () => rewritePattern(pattern, flags, options).length;
		let repeat = 0;
		let expected;
		let elapsed = 0n;

		const runAll = (count) => {
			let total = 0;
			for (let index = 0; index < count; index++) {
				total += run();
			}
			return total;
		};
		const check = (total, count) => {
			if (total !== expected * count) {
				throw new Error(
					`Unexpected result: ${total} after ${count} runs, expected ` +
					`${expected} per run`
				);
			}
		};
		// Stops the benchmark once it has used up its time budget.
		const account = (b, sample) => {
			if (b.phase !== 'measurement') {
				return;
			}
			elapsed += sample.duration_ns;
			if (b.index + 1 >= MIN_SAMPLES && elapsed >= TIME_BUDGET_NS) {
				b.done();
			}
		};

		bench(name, {
			samples: MAX_SAMPLES,
			warmup: 1,
			params: {
				pattern: `/${pattern}/${flags}`,
				transform: Object.keys(options)
					.filter((feature) => options[feature] === 'transform')
					.join(', ') || 'none',
			},
		}, (b) => {
			if (!repeat) {
				// The first call also loads the Unicode data the pattern needs, so
				// it is not part of the calibration.
				expected = run();
				let count = 1;
				let total;
				let duration;
				for (;;) {
					const start = process.hrtime.bigint();
					total = runAll(count);
					duration = process.hrtime.bigint() - start;
					if (duration >= TARGET_SAMPLE_NS || count >= MAX_REPEAT) {
						break;
					}
					count *= 2;
				}
				check(total, count);
				repeat = count;
				account(b, b.record({
					operations: count,
					duration_ns: duration,
					detail: { repeat },
				}));
				return;
			}
			// Collect garbage from earlier samples outside the measured region, when
			// running with `--expose-gc`.
			globalThis.gc?.();
			b.start();
			const total = runAll(repeat);
			const sample = b.end(repeat, { detail: { repeat } });
			check(total, repeat);
			account(b, sample);
		});
	}
};

const TRANSFORM_U = { unicodeFlag: 'transform' };
const TRANSFORM_U_PROPERTIES = {
	unicodeFlag: 'transform',
	unicodePropertyEscapes: 'transform',
};
const TRANSFORM_V = { unicodeSetsFlag: 'transform', unicodeFlag: 'transform' };
const TRANSFORM_V_KEEP_U = { unicodeSetsFlag: 'transform' };
const TRANSFORM_MODIFIERS = { modifiers: 'transform' };
const TRANSFORM_MODIFIERS_PROPERTIES = {
	modifiers: 'transform',
	unicodePropertyEscapes: 'transform',
};
const TRANSFORM_MODIFIERS_V = {
	unicodeSetsFlag: 'transform',
	modifiers: 'transform',
};

suite('basic', () => {
	benchEach('no transform', [
		['[a-z]+\\d*', 'u', {}],
	]);

	benchEach('unicodeFlag', [
		['[a-z\\u{1F600}-\\u{1F64F}]', 'u', TRANSFORM_U],
		['[^a]', 'u', TRANSFORM_U],
		['.', 'su', { unicodeFlag: 'transform', dotAllFlag: 'transform' }],
	]);
});

suite('unicodePropertyEscapes', () => {
	benchEach('property', [
		['\\p{L}', 'u', TRANSFORM_U_PROPERTIES],
		['\\P{L}', 'u', TRANSFORM_U_PROPERTIES],
		['\\p{Script_Extensions=Han}', 'u', TRANSFORM_U_PROPERTIES],
		['[\\p{L}\\p{N}_]', 'u', TRANSFORM_U_PROPERTIES],
		['\\p{L}', 'u', { unicodePropertyEscapes: 'transform' }],
	]);
});

suite('ignoreCase', () => {
	benchEach('range', [
		['[a-z]', 'iu', TRANSFORM_U],
		['[\\u{0}-\\u{10FFFF}]', 'iu', TRANSFORM_U],
		['[^\\u{100}-\\u{FFFFF}]', 'iu', TRANSFORM_U],
	]);

	benchEach('property', [
		['\\p{Lowercase_Letter}', 'iu', TRANSFORM_U_PROPERTIES],
		['[^\\P{Lowercase_Letter}]', 'iu', TRANSFORM_U_PROPERTIES],
	]);
});

suite('modifiers', () => {
	benchEach('range', [
		['(?i:[a-z])', '', TRANSFORM_MODIFIERS],
		['(?i:[\\u{0}-\\u{10FFFF}])', 'u', TRANSFORM_MODIFIERS],
	]);

	benchEach('property', [
		['(?i:\\p{Lowercase_Letter})', 'u', TRANSFORM_MODIFIERS_PROPERTIES],
		['(?i:[^\\P{Lowercase_Letter}])', 'u', TRANSFORM_MODIFIERS_PROPERTIES],
	]);
});

suite('unicodeSets', () => {
	benchEach('set operations', [
		['[\\p{L}&&\\p{Ll}]', 'v', TRANSFORM_V],
		['[\\p{L}--\\p{Ll}]', 'v', TRANSFORM_V],
		['[[a-z]--[aeiou]]', 'v', TRANSFORM_V],
	]);

	benchEach('set operations, ignoreCase', [
		['[\\p{L}&&\\p{Ll}]', 'iv', TRANSFORM_V],
		['[\\w&&[\\u{0}-\\u{10FFFF}]]', 'iv', TRANSFORM_V],
		['[\\w--[\\u{100}-\\u{FFFFF}]]', 'iv', TRANSFORM_V],
		['(?i:[\\p{L}&&[\\u{0}-\\u{10FFFF}]])', 'v', TRANSFORM_MODIFIERS_V],
	]);

	benchEach('properties of strings', [
		['\\p{RGI_Emoji}', 'v', TRANSFORM_V],
		['\\p{RGI_Emoji}', 'v', TRANSFORM_V_KEEP_U],
		['[\\p{RGI_Emoji}--\\q{👨‍👩‍👧‍👦}]', 'v', TRANSFORM_V],
	]);
});
