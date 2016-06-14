'use strict';

const assert = require('assert');
const regenerate = require('regenerate');
const rewritePattern = require('../rewrite-pattern.js');
const fixtures = require('regexpu-fixtures');

describe('rewritePattern', function() {
	for (const fixture of fixtures) {
		const pattern = fixture.pattern;
		for (const flag of fixture.flags) {
			it('rewrites `/' + pattern + '/' + flag + '` correctly', function() {
				assert.equal(rewritePattern(pattern, flag), fixture.transpiled);
			});
		}
	}
});

const unicodePropertyEscapeFixtures = [
	// http://unicode.org/reports/tr18/#RL1.2 item 1
	{
		'path': 'General_Category/Uppercase_Letter',
		'expressions': [
			'Lu',
			'lu',
			'General_Category=Lu',
			'gc=lu',
			'Uppercase_Letter',
			'UppercaseLetter',
			'uppercase letter',
			'uppercaseletter',
			'General_Category=Uppercase_Letter',
			'General_Category=UppercaseLetter',
			'gc=Uppercase_Letter',
			'gc=UppercaseLetter'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 2a
	{
		'path': 'Script/Greek',
		'expressions': [
			'Script=Greek',
			'script=Greek',
			'sc=greek'
		]
	},
	{
		'path': 'Script/Hiragana',
		'expressions': [
			'Script=Hiragana',
			'script=Hira',
			'sc=hira'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 2b
	{
		'path': 'Script_Extensions/Greek',
		'expressions': [
			'Script_Extensions=Greek',
			'scriptextensions=Greek',
			'scx=greek'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 3
	{
		'path': 'Binary_Property/Alphabetic',
		'expressions': [
			'Alphabetic',
			'alpha'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 4
	{
		'path': 'Binary_Property/Uppercase',
		'expressions': [
			'Uppercase',
			'upper'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 5
	{
		'path': 'Binary_Property/Lowercase',
		'expressions': [
			'Lowercase',
			'lower'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 6
	{
		'path': 'Binary_Property/White_Space',
		'expressions': [
			'White_Space',
			'wspace'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 7
	{
		'path': 'Binary_Property/Noncharacter_Code_Point',
		'expressions': [
			'Noncharacter_Code_Point',
			'nchar'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 8
	{
		'path': 'Binary_Property/Default_Ignorable_Code_Point',
		'expressions': [
			'Default_Ignorable_Code_Point',
			'di'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 9a
	{
		'path': 'Binary_Property/Any',
		'expressions': [
			'Any',
			'any'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 9b
	{
		'path': 'Binary_Property/ASCII',
		'expressions': [
			'ASCII',
			'ascii'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 9c
	{
		'path': 'Binary_Property/Assigned',
		'expressions': [
			'Assigned',
			'assigned'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/ASCII_Hex_Digit',
		'expressions': [
			'ASCII_Hex_Digit',
			'ahex'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Bidi_Class/Arabic_Letter',
		'expressions': [
			'Bidi_Class=Arabic_Letter',
			'Bidi_Class=al',
			'bc=al'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Bidi_Control',
		'expressions': [
			'Bidi_Control',
			'bidic'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Block/Alphabetic_Presentation_Forms',
		'expressions': [
			'Block=Alphabetic_Presentation_Forms',
			'Block=alphabeticpresentationforms',
			'Block=alphabeticpf',
			'blk=alphabeticpf'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Bidi_Mirrored',
		'expressions': [
			'Bidi_Mirrored',
			'bidim'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Case_Ignorable',
		'expressions': [
			'Case_Ignorable',
			'ci'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Cased',
		'expressions': [
			'Cased',
			'cased'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_NFKC_Casefolded',
		'expressions': [
			'Changes_When_NFKC_Casefolded',
			'cwkcf'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Casefolded',
		'expressions': [
			'Changes_When_Casefolded',
			'cwcf'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Casemapped',
		'expressions': [
			'Changes_When_Casemapped',
			'cwcm'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Lowercased',
		'expressions': [
			'Changes_When_Lowercased',
			'cwl'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Titlecased',
		'expressions': [
			'Changes_When_Titlecased',
			'cwt'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Uppercased',
		'expressions': [
			'Changes_When_Uppercased',
			'cwu'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Composition_Exclusion',
		'expressions': [
			'Composition_Exclusion',
			'ce'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Dash',
		'expressions': [
			'Dash',
			'dash'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Deprecated',
		'expressions': [
			'Deprecated',
			'dep'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Diacritic',
		'expressions': [
			'Diacritic',
			'dia'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Extender',
		'expressions': [
			'Extender',
			'ext'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Full_Composition_Exclusion',
		'expressions': [
			'Full_Composition_Exclusion',
			'comp_ex',
			'compex'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Grapheme_Base',
		'expressions': [
			'Grapheme_Base',
			'grbase'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Grapheme_Extend',
		'expressions': [
			'Grapheme_Extend',
			'grext'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Hex_Digit',
		'expressions': [
			'Hex_Digit',
			'hex'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/ID_Continue',
		'expressions': [
			'ID_Continue',
			'idc'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/ID_Start',
		'expressions': [
			'ID_Start',
			'ids'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Ideographic',
		'expressions': [
			'Ideographic',
			'ideo'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/IDS_Binary_Operator',
		'expressions': [
			'IDS_Binary_Operator',
			'idsb'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/IDS_Trinary_Operator',
		'expressions': [
			'IDS_Trinary_Operator',
			'idst'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Join_Control',
		'expressions': [
			'Join_Control',
			'joinc'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Logical_Order_Exception',
		'expressions': [
			'Logical_Order_Exception',
			'loe'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Math',
		'expressions': [
			'Math',
			'math'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Pattern_Syntax',
		'expressions': [
			'Pattern_Syntax',
			'patsyn'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Pattern_White_Space',
		'expressions': [
			'Pattern_White_Space',
			'patws'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Quotation_Mark',
		'expressions': [
			'Quotation_Mark',
			'qmark'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Radical',
		'expressions': [
			'Radical',
			'radical'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Soft_Dotted',
		'expressions': [
			'Soft_Dotted',
			'sd'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	// TODO: Re-enable this test once Unicode v9 is released.
	// {
	// 	'path': 'Binary_Property/STerm',
	// 	'expressions': [
	// 		'STerm',
	// 		'sterm'
	// 	]
	// },
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Terminal_Punctuation',
		'expressions': [
			'Terminal_Punctuation',
			'term'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Unified_Ideograph',
		'expressions': [
			'Unified_Ideograph',
			'uideo'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Variation_Selector',
		'expressions': [
			'Variation_Selector',
			'vs'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/XID_Continue',
		'expressions': [
			'XID_Continue',
			'xidc'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/XID_Start',
		'expressions': [
			'XID_Start',
			'xids'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Bidi_Paired_Bracket_Type/Open',
		'expressions': [
			'Bidi_Paired_Bracket_Type=Open',
			'bpt=o'
		]
	}
];

const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
const getPropertyValuePattern = function(path) {
	const codePoints = require('unicode-8.0.0/' + path + '/code-points.js');
	return {
		'p': regenerate(codePoints).toString(),
		'P': UNICODE_SET.clone().remove(codePoints).toString()
	};
};

describe('unicodePropertyEscapes', function() {
	const features = {
		'unicodePropertyEscape': true
	};
	for (const fixture of unicodePropertyEscapeFixtures) {
		const expected = getPropertyValuePattern(fixture.path);
		for (const pattern of fixture.expressions) {
			const p = `\\p{${ pattern }}`;
			it('rewrites `/' + p + '/u` correctly', function() {
				const transpiled = rewritePattern(p, 'u', features);
				assert(
					transpiled == expected.p ||
					transpiled == '(?:' + expected.p + ')'
				);
			});
			const P = `\\P{${ pattern }}`;
			it('rewrites `/' + P + '/u` correctly', function() {
				const transpiled = rewritePattern(P, 'u', features);
				assert(
					transpiled == expected.P ||
					transpiled == '(?:' + expected.P + ')'
				);
			});
		}
	}
	it('transpiles Unicode property escapes within various constructions', function() {
		assert.equal(
			rewritePattern('\\p{ASCII_Hex_Digit}', 'u', features),
			'[0-9A-Fa-f]'
		);
		assert.equal(
			rewritePattern('\\p{Block=Aegean_Numbers}', 'u', features),
			'(?:\\uD800[\\uDD00-\\uDD3F])'
		);
		assert.equal(
			rewritePattern('\\p{ASCII_Hex_Digit}+', 'u', features),
			'[0-9A-Fa-f]+'
		);
		assert.equal(
			rewritePattern('\\p{Block=Aegean_Numbers}+', 'u', features),
			'(?:\\uD800[\\uDD00-\\uDD3F])+'
		);
		assert.equal(
			rewritePattern('[\\p{ASCII_Hex_Digit}_]', 'u', features),
			'[0-9A-F_a-f]'
		);
		assert.equal(
			rewritePattern('[\\P{Block=Low_Surrogates}]', 'u', features),
			'(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF]))'
		);
		assert.equal(
			rewritePattern('[\\p{Block=Aegean_Numbers}_]', 'u', features),
			'(?:_|\\uD800[\\uDD00-\\uDD3F])'
		);
		assert.equal(
			rewritePattern('[\\P{Block=Low_Surrogates}_]', 'u', features),
			'(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF]))'
		);
		assert.equal(
			rewritePattern('(?:\\p{ASCII_Hex_Digit})', 'u', features),
			'(?:[0-9A-Fa-f])'
		);
		assert.equal(
			rewritePattern('(?:\\p{Block=Aegean_Numbers})', 'u', features),
			'(?:(?:\\uD800[\\uDD00-\\uDD3F]))'
		);
	});
	it('throws without the `u` flag', function() {
		assert.throws(function() {
			rewritePattern('\\p{ASCII_Hex_Digit}', '', features);
		}, Error);
		assert.throws(function() {
			rewritePattern('\\P{ASCII_Hex_Digit}', '', features);
		}, Error);
	});
	it('throws without the `unicodePropertyEscape` feature enabled', function() {
		assert.throws(function() {
			rewritePattern('\\p{ASCII_Hex_Digit}', 'u');
		}, Error);
		assert.throws(function() {
			rewritePattern('\\P{ASCII_Hex_Digit}', 'u');
		}, Error);
	});
	it('throws on unknown binary properties', function() {
		assert.throws(function() {
			rewritePattern('\\p{UnknownBinaryProperty}', 'u', features);
		}, Error);
		assert.throws(function() {
			rewritePattern('\\P{UnknownBinaryProperty}', 'u', features);
		}, Error);
	});
	it('throws on non-binary properties without a value', function() {
		assert.throws(function() {
			rewritePattern('\\p{General_Category}', 'u', features);
		}, Error);
	});
	it('throws on unknown property values', function() {
		assert.throws(function() {
			rewritePattern('\\p{General_Category=UnknownCategory}', 'u', features);
		}, Error);
		assert.throws(function() {
			rewritePattern('\\P{General_Category=UnknownCategory}', 'u', features);
		}, Error);
	});
	it('simplifies the output using Unicode code point escapes when `useUnicodeFlag` is enabled', function() {
		assert.equal(
			rewritePattern('\\p{Block=Aegean_Numbers}', 'u', {
				'unicodePropertyEscape': true,
				'useUnicodeFlag': true
			}),
			'[\\u{10100}-\\u{1013F}]'
		);
	});
	assert.equal(
		rewritePattern('\u03B8', 'iu'),
		'[\\u03B8\\u03F4]'
	);
	assert.equal(
		rewritePattern('\u03B8', 'iu', {
			'useUnicodeFlag': true
		}),
		'\\u03B8'
	);
});
