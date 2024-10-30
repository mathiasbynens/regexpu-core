'use strict';
const describe = global.describe || require("node:test").describe;
const it = global.it || require("node:test").it;
const assert = require('assert');
const regenerate = require('regenerate');
const rewritePattern = require('../rewrite-pattern.js');

const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);

const IS_NODE_6 = process.version.startsWith('v6.');

const { unicodeFixtures } = require("./fixtures/unicode.js");
const { unicodePropertyEscapeFixtures, unicodePropertyEscapePathExpressionsFixtures } = require("./fixtures/unicode-property-escape.js");
const { dotAllFlagFixtures } = require("./fixtures/dot-all-flag.js");
const { namedGroupFixtures } = require("./fixtures/named-group.js");
const { characterClassFixtures } = require("./fixtures/character-class.js");
const { unicodeSetFixtures } = require("./fixtures/unicode-set.js");
const { modifiersFixtures } = require("./fixtures/modifiers.js");

/** For node 6 compat */
assert.match || (assert.match = function match(value, regex) { assert.ok(regex.exec(value) !== null, `${value} does not match ${regex.toString()}`) });
assert.doesNotMatch || (assert.doesNotMatch = function doesNotMatch(value, regex) { assert.ok(regex.exec(value) === null, `${value} does match ${regex.toString()}`) });

describe('rewritePattern { unicodeFlag }', () => {
	const options = {
		'unicodeFlag': 'transform'
	};
	for (const fixture of unicodeFixtures) {
		const pattern = fixture.pattern;
		for (const flag of fixture.flags) {
			if (flag.includes('u')) {
				it('rewrites `/' + pattern + '/' + flag + '` correctly', () => {
					assert.equal(rewritePattern(pattern, flag, options), fixture.transpiled);
				});
			} else {
				it('leaves `/' + pattern + '/' + flag + '` as-is', () => {
					assert.equal(rewritePattern(pattern, flag, options), pattern);
				});
			}
		}
	}
});

const getPropertyValuePattern = (path) => {
	const codePoints = require(`@unicode/unicode-16.0.0/${
		path }/code-points.js`);
	return {
		'p': regenerate(codePoints).toString(),
		'P': UNICODE_SET.clone().remove(codePoints).toString()
	};
};

describe('unicodePropertyEscapes', () => {
	const features = {
		'unicodePropertyEscapes': 'transform',
		'unicodeFlag': 'transform'
	};
	for (const fixture of unicodePropertyEscapeFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags || "u";
		const options = fixture.options || features;
		const transformUnicodeFlag = options.unicodeFlag === "transform";

		const inputRE = `/${pattern}/${flags}`;

		const expected = fixture.expected;
		const throws = fixture.throws;

		if (throws) {
			if (expected) {
				throw new Error(
					`TEST ERROR: ${inputRE} cannot both throw and have an expected output.`
				);
			}
			it(`throws for \`${inputRE}\` ${transformUnicodeFlag ? "without " : ""}using the u flag`, () => {
				assert.throws(() => {
					rewritePattern(pattern, flags, options);
				}, throws);
			});
		} else {
			it(`rewrites \`${inputRE}\` correctly ${transformUnicodeFlag ? "without " : ""}using the u flag`, () => {
				let actualFlags = flags;
				options.onNewFlags = (flags) => {
					actualFlags = flags;
				};
				const transpiled = rewritePattern(pattern, flags, options);
				if (expected !== undefined && transpiled != "(?:" + expected + ")") {
					assert.strictEqual(transpiled, expected);
				}
				for (const match of fixture.matches || []) {
					const transpiledRegex = new RegExp(transpiled, actualFlags);
					assert.match(match, transpiledRegex);
				}
				for (const nonMatch of fixture.nonMatches || []) {
					const transpiledRegex = new RegExp(transpiled, actualFlags);
					assert.doesNotMatch(nonMatch, transpiledRegex);
				}
			});
		}
	}
	
	// ignore unicodePropertyEscapePathExpressionsFixtures tests as @unicode/unicode-* library does not support node.js 6
	if (IS_NODE_6) return;
	for (const fixture of unicodePropertyEscapePathExpressionsFixtures) {
		const expected = getPropertyValuePattern(fixture.path);
		for (const pattern of fixture.expressions) {
			const p = `\\p{${ pattern }}`;
			it('rewrites `/' + p + '/u` correctly', () => {
				const transpiled = rewritePattern(p, 'u', features);
				if (transpiled != '(?:' + expected.p + ')') {
					assert.equal(transpiled, expected.p);
				}
			});
			const P = `\\P{${ pattern }}`;
			it('rewrites `/' + P + '/u` correctly', () => {
				const transpiled = rewritePattern(P, 'u', features);
				if (transpiled != '(?:' + expected.P + ')') {
					assert.equal(transpiled, expected.P);
				}
			});
		}
	}
});

describe('dotAllFlag', () => {
	for (const fixture of dotAllFlagFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags;
		const options = Object.assign({
			'dotAllFlag': 'transform'
		}, fixture.options);
		it('rewrites `/' + pattern + '/' + flags + '` correctly', () => {
			const transpiled = rewritePattern(pattern, flags, options);
			const expected = fixture.expected;
			if (transpiled != '(?:' + expected + ')') {
				assert.strictEqual(transpiled, expected);
			}
		});
	}

	it('leaves `/./su` as-is', () => {
		assert.equal(rewritePattern('.', 'su'), '.');
	});
});

describe('namedGroups', () => {
	for (const fixture of namedGroupFixtures) {
		const {
			pattern,
			flags,
			expected,
			expectedGroups,
			options = {}
		} = fixture;
		const groups = [];

		Object.assign(options, {
			namedGroups: 'transform',
			'onNamedGroup': (name, index) => {
				groups.push([ name, index ]);
			}
		});

		it('rewrites `/' + pattern + '/' + flags + '` correctly', () => {
			const transpiled = rewritePattern(pattern, flags, options);
			assert.strictEqual(transpiled, expected);
			if (expectedGroups) {
				assert.deepStrictEqual(groups, expectedGroups);
			}
		});
	}

	it('onNamedGroup is optional', () => {
		let transpiled;
		const expected = '()';
		assert.doesNotThrow(() => {
			transpiled = rewritePattern('(?<name>)', '', {
				namedGroups: 'transform'
			});
		});
		assert.strictEqual(transpiled, expected);
	});

	it('multiple groups with the same name in the same disjunction are disallowed', () => {
		assert.throws(() => {
			rewritePattern('(?<name>)(?<name>)', '', {
				namedGroups: 'transform'
			});
		});

		assert.throws(() => {
			rewritePattern('(?<name>)(?:a|(?<name>))', '', {
				namedGroups: 'transform'
			});
		});

		assert.throws(() => {
			rewritePattern('(?:b|(?<name>))(?:a|(?<name>))', '', {
				namedGroups: 'transform'
			});
		});
	});

	it('multiple groups with the same name in the different disjunctions are allowed', () => {
		assert.doesNotThrow(() => {
			rewritePattern('(?<name>)|(?<name>)', '', {
				namedGroups: 'transform'
			});
		});

		assert.doesNotThrow(() => {
			rewritePattern('(?:b|(?<name>))|(?:a|(?<name>))', '', {
				namedGroups: 'transform'
			});
		});
	});

	it('named references must reference a group', () => {
		assert.throws(() => {
			rewritePattern('\\k<name>', '', {
				namedGroups: 'transform'
			});
		});
	});

	it('should not transpile when namedGroups is not enabled', () => {
		const pattern = '(?<name>)';
		let transpiled;
		assert.doesNotThrow(() => {
			transpiled = rewritePattern(pattern, '');
		});
		assert.strictEqual(pattern, transpiled);
	});

	it('should support named group references when namedGroups is not enabled', () => {
		const pattern = '(?<name>)\\k<name>';
		let transpiled;
		assert.doesNotThrow(() => {
			transpiled = rewritePattern(pattern, '');
		});
		assert.strictEqual(pattern, transpiled);
	});

	it('should validate named group references when namedGroups is not enabled', () => {
		assert.throws(() => rewritePattern('\\k<foo>', ''), /Unknown group names: foo/);
	});

	it('should call onNamedGroup even if namedGroups is not enabled', () => {
		let called = false;
		rewritePattern('(?<name>)', '', {
			onNamedGroup() {
				called = true;
			},
		});
		assert.strictEqual(called, true);
	})
});

describe('character classes', () => {
	for (const fixture of characterClassFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags;
		const options = fixture.options;
		const transformUnicodeFlag = options.unicodeFlag === 'transform';
		it('rewrites `/' + pattern + '/' + flags + '` with' + (transformUnicodeFlag ? 'out' : '') + ' unicode correctly', () => {
			let actualFlags = flags;
			options.onNewFlags = (flags) => { actualFlags = flags };
			const transpiled = rewritePattern(pattern, flags, options);
			const expected = fixture.expected;
			if (transpiled != '(?:' + expected + ')') {
				assert.strictEqual(transpiled, expected);
			}
			for (const match of fixture.matches || []) {
				const transpiledRegex = new RegExp(transpiled, actualFlags);
				assert.match(match, transpiledRegex);
			}
			for (const nonMatch of fixture.nonMatches || []) {
				const transpiledRegex = new RegExp(transpiled, actualFlags);
				assert.doesNotMatch(nonMatch, transpiledRegex);
			}
		});
	}
});

describe('unicodeSets (v) flag', () => {
	// Re-use the unicode fixtures but replacing the input pattern's `u` flag with `v` flag
	for (const fixture of unicodeFixtures) {
		if (fixture.flags.includes("u")) {
			for (let flag of fixture.flags) {
				flag = flag.replace("u", "v");
				const { pattern, transpiled: expected } = fixture;
				const inputRE = `/${pattern}/${flag}`;
				it(`rewrites \`${inputRE}\` correctly without using the u flag`, () => {
					let actualFlags = flag;
					const options = {
						unicodeSetsFlag: "transform",
						unicodeFlag: "transform",
						onNewFlags(flags) {
							actualFlags = flags;
						}
					};
					const transpiled = rewritePattern(pattern, flag, options);
					if (transpiled != "(?:" + expected + ")") {
						assert.strictEqual(transpiled, expected);
					}
					for (const match of fixture.matches || []) {
						const transpiledRegex = new RegExp(transpiled, actualFlags);
						assert.match(match, transpiledRegex);
					}
					for (const nonMatch of fixture.nonMatches || []) {
						const transpiledRegex = new RegExp(transpiled, actualFlags);
						assert.doesNotMatch(nonMatch, transpiledRegex);
					}
				});
			}
		}
	}

	if (IS_NODE_6) return;

	for (const fixture of unicodeSetFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags || 'v';
		const options = fixture.options || { unicodeSetsFlag: 'transform' };
		const transformUnicodeFlag = options.unicodeFlag === 'transform';

		const inputRE = `/${pattern}/${flags}`;

		const expected = fixture.expected;
		const throws = fixture.throws;

		if (throws) {
			if (expected) {
				throw new Error(`TEST ERROR: ${inputRE} cannot both throw and have an expected output.`);
			}
			it(`throws for \`${inputRE}\` ${transformUnicodeFlag ? 'without ' : ''}using the u flag`, () => {
				assert.throws(() => {
					rewritePattern(pattern, flags, options);
				}, throws);
			});
		} else {
			it(`rewrites \`${inputRE}\` correctly ${transformUnicodeFlag ? 'without ' : ''}using the u flag`, () => {
				let actualFlags = flags;
				options.onNewFlags = (flags) => { actualFlags = flags };
				const transpiled = rewritePattern(pattern, flags, options);
				if (expected !== undefined && transpiled != '(?:' + expected + ')') {
					assert.strictEqual(transpiled, expected);
				}
				for (const match of fixture.matches || []) {
					const transpiledRegex = new RegExp(transpiled, actualFlags);
					assert.match(match, transpiledRegex);
				}
				for (const nonMatch of fixture.nonMatches || []) {
					const transpiledRegex = new RegExp(transpiled, actualFlags);
					assert.doesNotMatch(nonMatch, transpiledRegex);
				}
			});
		}
	}

	it('Property of strings used without the v flag', () => {
		assert.throws(() => {
			rewritePattern('\\p{Basic_Emoji}', 'u')
		}, /Properties of strings are only supported when using the unicodeSets \(v\) flag/);
	})
});

describe('modifiers', () => {
	for (const fixture of modifiersFixtures) {
		const {
			pattern,
			flags = '',
			expected,
			options = {}
		} = fixture;

		let actualFlags = flags;

		options.onNewFlags = (newFlags) => {
			actualFlags = newFlags;
		}
		if (options.modifiers === undefined) {
			options.modifiers = 'transform';
		}

		it('rewrites `/' + pattern + '/' + flags + '` correctly', () => {
			const transpiled = rewritePattern(pattern, flags, options);
			if (expected != undefined) {
				assert.strictEqual(transpiled, expected);
			}
			if (fixture.expectedFlags != undefined) {
				assert.strictEqual(actualFlags, fixture.expectedFlags);
			}
			for (const match of fixture.matches || []) {
				const transpiledRegex = new RegExp(transpiled, actualFlags);
				assert.match(match, transpiledRegex);
			}
			for (const nonMatch of fixture.nonMatches || []) {
				const transpiledRegex = new RegExp(transpiled, actualFlags);
				assert.doesNotMatch(nonMatch, transpiledRegex);
			}
		});
	}
});

