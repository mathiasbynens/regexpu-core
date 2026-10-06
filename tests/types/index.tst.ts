// Type tests for `rewrite-pattern.d.ts`, run by `npm run test-types`.
import { describe, expect, test } from 'tstyche';
import rewritePattern from 'regexpu-core';
import type { RegexpuOptions } from 'regexpu-core';

describe('rewritePattern', () => {
	test('returns a string', () => {
		expect(rewritePattern('a.b', 'u')).type.toBe<string>();
	});

	test('the options are optional', () => {
		expect(rewritePattern).type.toBeCallableWith('a.b', 'u');
		expect(rewritePattern).type.toBeCallableWith('a.b', 'u', undefined);
		expect(rewritePattern).type.toBeCallableWith('a.b', 'u', { unicodeFlag: 'transform', dotAllFlag: false });
	});

	test('the flags are required', () => {
		expect(rewritePattern).type.not.toBeCallableWith('a');
	});

	test('rejects invalid options', () => {
		// Only `modifiers` can be `'parse'`.
		expect(rewritePattern).type.not.toBeCallableWith('a', 'u', { unicodeFlag: 'parse' });
		expect(rewritePattern).type.not.toBeCallableWith('a', 'u', { unknownOption: 'transform' });
		// The callbacks receive a string.
		expect(rewritePattern).type.not.toBeCallableWith('a', 'u', { onNewFlags(flags: number) {} });
	});
});

describe('RegexpuOptions', () => {
	test('accepts every option', () => {
		expect<RegexpuOptions>().type.toBeAssignableFrom({
			unicodeFlag: 'transform',
			unicodeSetsFlag: 'transform',
			dotAllFlag: 'transform',
			unicodePropertyEscapes: 'transform',
			namedGroups: 'transform',
			modifiers: 'parse',
			onNamedGroup(name: string, index: number) {},
			onNewFlags(flags: string) {},
		} as const);
	});
});
