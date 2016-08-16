'use strict';

const assert = require('assert');
const regenerate = require('regenerate');
const rewritePattern = require('../rewrite-pattern.js');
const fixtures = require('regexpu-fixtures');

const BMP_PATTERN = '[\\s\\S]';
const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
const UNICODE_PATTERN = UNICODE_SET.toString();

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
			'gc=Lu',
			'gc=Uppercase_Letter',
			'General_Category=Lu',
			'General_Category=Uppercase_Letter',
			'Lu',
			'Uppercase_Letter'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 2a
	{
		'path': 'Script/Greek',
		'expressions': [
			'sc=Grek',
			'sc=Greek',
			'Script=Grek',
			'Script=Greek'
		]
	},
	{
		'path': 'Script/Hiragana',
		'expressions': [
			'sc=Hira',
			'sc=Hiragana',
			'Script=Hira',
			'Script=Hiragana'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 2b
	{
		'path': 'Script_Extensions/Greek',
		'expressions': [
			'scx=Grek',
			'scx=Greek',
			'Script_Extensions=Grek',
			'Script_Extensions=Greek'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 3
	{
		'path': 'Binary_Property/Alphabetic',
		'expressions': [
			'Alpha',
			'Alphabetic'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 4
	{
		'path': 'Binary_Property/Uppercase',
		'expressions': [
			'Upper',
			'Uppercase'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 5
	{
		'path': 'Binary_Property/Lowercase',
		'expressions': [
			'Lower',
			'Lowercase'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 6
	{
		'path': 'Binary_Property/White_Space',
		'expressions': [
			'WSpace',
			'White_Space'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 7
	{
		'path': 'Binary_Property/Noncharacter_Code_Point',
		'expressions': [
			'NChar',
			'Noncharacter_Code_Point'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 8
	{
		'path': 'Binary_Property/Default_Ignorable_Code_Point',
		'expressions': [
			'DI',
			'Default_Ignorable_Code_Point'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 9a
	{
		'path': 'Binary_Property/Any',
		'expressions': [
			'Any'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 9b
	{
		'path': 'Binary_Property/ASCII',
		'expressions': [
			'ASCII'
		]
	},
	// http://unicode.org/reports/tr18/#RL1.2 item 9c
	{
		'path': 'Binary_Property/Assigned',
		'expressions': [
			'Assigned'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/ASCII_Hex_Digit',
		'expressions': [
			'ASCII_Hex_Digit',
			'AHex'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Bidi_Class/Arabic_Letter',
		'expressions': [
			'bc=AL',
			'bc=Arabic_Letter',
			'Bidi_Class=AL',
			'Bidi_Class=Arabic_Letter'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Bidi_Control',
		'expressions': [
			'Bidi_C',
			'Bidi_Control'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Block/Alphabetic_Presentation_Forms',
		'expressions': [
			'blk=Alphabetic_PF',
			'blk=Alphabetic_Presentation_Forms',
			'Block=Alphabetic_PF',
			'Block=Alphabetic_Presentation_Forms'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Bidi_Mirrored',
		'expressions': [
			'Bidi_M',
			'Bidi_Mirrored'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Case_Ignorable',
		'expressions': [
			'CI',
			'Case_Ignorable',
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Cased',
		'expressions': [
			'Cased'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_NFKC_Casefolded',
		'expressions': [
			'CWKCF',
			'Changes_When_NFKC_Casefolded'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Casefolded',
		'expressions': [
			'CWCF',
			'Changes_When_Casefolded'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Casemapped',
		'expressions': [
			'CWCM',
			'Changes_When_Casemapped'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Lowercased',
		'expressions': [
			'CWL',
			'Changes_When_Lowercased'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Titlecased',
		'expressions': [
			'CWT',
			'Changes_When_Titlecased'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Uppercased',
		'expressions': [
			'CWU',
			'Changes_When_Uppercased'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Composition_Exclusion',
		'expressions': [
			'CE',
			'Composition_Exclusion'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Dash',
		'expressions': [
			'Dash'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Deprecated',
		'expressions': [
			'Dep',
			'Deprecated'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Diacritic',
		'expressions': [
			'Dia',
			'Diacritic'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Extender',
		'expressions': [
			'Ext',
			'Extender'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Full_Composition_Exclusion',
		'expressions': [
			'Comp_Ex',
			'Full_Composition_Exclusion'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Grapheme_Base',
		'expressions': [
			'Gr_Base',
			'Grapheme_Base'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Grapheme_Extend',
		'expressions': [
			'Gr_Ext',
			'Grapheme_Extend'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Hex_Digit',
		'expressions': [
			'Hex',
			'Hex_Digit'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/ID_Continue',
		'expressions': [
			'IDC',
			'ID_Continue'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/ID_Start',
		'expressions': [
			'IDS',
			'ID_Start'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Ideographic',
		'expressions': [
			'Ideo',
			'Ideographic'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/IDS_Binary_Operator',
		'expressions': [
			'IDSB',
			'IDS_Binary_Operator'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/IDS_Trinary_Operator',
		'expressions': [
			'IDST',
			'IDS_Trinary_Operator'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Join_Control',
		'expressions': [
			'Join_C',
			'Join_Control'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Logical_Order_Exception',
		'expressions': [
			'LOE',
			'Logical_Order_Exception'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Math',
		'expressions': [
			'Math'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Pattern_Syntax',
		'expressions': [
			'Pat_Syn',
			'Pattern_Syntax'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Pattern_White_Space',
		'expressions': [
			'Pat_WS',
			'Pattern_White_Space'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Quotation_Mark',
		'expressions': [
			'QMark',
			'Quotation_Mark'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Radical',
		'expressions': [
			'Radical'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Soft_Dotted',
		'expressions': [
			'SD',
			'Soft_Dotted'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Sentence_Terminal',
		'expressions': [
			'STerm',
			'Sentence_Terminal'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Terminal_Punctuation',
		'expressions': [
			'Term',
			'Terminal_Punctuation'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Unified_Ideograph',
		'expressions': [
			'UIdeo',
			'Unified_Ideograph'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Variation_Selector',
		'expressions': [
			'VS',
			'Variation_Selector'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/XID_Continue',
		'expressions': [
			'XIDC',
			'XID_Continue'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/XID_Start',
		'expressions': [
			'XIDS',
			'XID_Start'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Bidi_Paired_Bracket_Type/Open',
		'expressions': [
			'bpt=o',
			'bpt=Open',
			'Bidi_Paired_Bracket_Type=o',
			'Bidi_Paired_Bracket_Type=Open'
		]
	},
	{
		'path': 'Block/Superscripts_And_Subscripts',
		'expressions': [
			'blk=Super_And_Sub',
			'blk=Superscripts_And_Subscripts',
			'Block=Super_And_Sub',
			'Block=Superscripts_And_Subscripts'
		]
	}
];

const getPropertyValuePattern = function(path) {
	const codePoints = require('unicode-9.0.0/' + path + '/code-points.js');
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
	it('throws when loose matching is attempted', function() {
		assert.throws(function() {
			rewritePattern('\\p{gc=uppercaseletter}', 'u', features);
		}, Error);
		assert.throws(function() {
			rewritePattern('\p{Block=Superscripts and Subscripts}', 'u', features);
		}, Error);
		assert.throws(function() {
			rewritePattern('\\P{_-_lOwEr_C-A_S-E_-_}', 'u', features);
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
