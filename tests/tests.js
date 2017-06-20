'use strict';

const assert = require('assert');
const regenerate = require('regenerate');
const rewritePattern = require('../rewrite-pattern.js');
const fixtures = require('regexpu-fixtures');

const BMP_SET = regenerate().addRange(0x0, 0xFFFF);
const BMP_PATTERN = BMP_SET.toString({ 'bmpOnly': true });
const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
const UNICODE_PATTERN = UNICODE_SET.toString();

describe('rewritePattern', () => {
	for (const fixture of fixtures) {
		const pattern = fixture.pattern;
		for (const flag of fixture.flags) {
			it('rewrites `/' + pattern + '/' + flag + '` correctly', () => {
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
	// {
	// 	'path': 'Bidi_Class/Arabic_Letter',
	// 	'expressions': [
	// 		'bc=AL',
	// 		'bc=Arabic_Letter',
	// 		'Bidi_Class=AL',
	// 		'Bidi_Class=Arabic_Letter'
	// 	]
	// },
	// http://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Bidi_Control',
		'expressions': [
			'Bidi_C',
			'Bidi_Control'
		]
	},
	// http://unicode.org/reports/tr18/#RL2.7
	// {
	// 	'path': 'Block/Alphabetic_Presentation_Forms',
	// 	'expressions': [
	// 		'blk=Alphabetic_PF',
	// 		'blk=Alphabetic_Presentation_Forms',
	// 		'Block=Alphabetic_PF',
	// 		'Block=Alphabetic_Presentation_Forms'
	// 	]
	// },
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
	// {
	// 	'path': 'Bidi_Paired_Bracket_Type/Open',
	// 	'expressions': [
	// 		'bpt=o',
	// 		'bpt=Open',
	// 		'Bidi_Paired_Bracket_Type=o',
	// 		'Bidi_Paired_Bracket_Type=Open'
	// 	]
	// },
	// {
	// 	'path': 'Block/Superscripts_And_Subscripts',
	// 	'expressions': [
	// 		'blk=Super_And_Sub',
	// 		'blk=Superscripts_And_Subscripts',
	// 		'Block=Super_And_Sub',
	// 		'Block=Superscripts_And_Subscripts'
	// 	]
	// },
	// http://unicode.org/reports/tr51/
	{
		'path': 'Emoji',
		'expressions': [
			'Emoji'
		]
	},
	// http://unicode.org/reports/tr51/
	{
		'path': 'Emoji_Component',
		'expressions': [
			'Emoji_Component'
		]
	},
	// http://unicode.org/reports/tr51/
	{
		'path': 'Emoji_Modifier',
		'expressions': [
			'Emoji_Modifier'
		]
	},
	// http://unicode.org/reports/tr51/
	{
		'path': 'Emoji_Modifier_Base',
		'expressions': [
			'Emoji_Modifier_Base'
		]
	},
	// http://unicode.org/reports/tr51/
	{
		'path': 'Emoji_Presentation',
		'expressions': [
			'Emoji_Presentation'
		]
	}
];

const getPropertyValuePattern = (path) => {
	const codePoints = path.startsWith('Emoji') ?
		require(`unicode-tr51/${ path }.js`) :
		require(`unicode-10.0.0/${ path }/code-points.js`);
	return {
		'p': regenerate(codePoints).toString(),
		'P': UNICODE_SET.clone().remove(codePoints).toString()
	};
};

describe('unicodePropertyEscapes', () => {
	const features = {
		'unicodePropertyEscape': true
	};
	for (const fixture of unicodePropertyEscapeFixtures) {
		const expected = getPropertyValuePattern(fixture.path);
		for (const pattern of fixture.expressions) {
			const p = `\\p{${ pattern }}`;
			it('rewrites `/' + p + '/u` correctly', () => {
				const transpiled = rewritePattern(p, 'u', features);
				assert(
					transpiled == expected.p ||
					transpiled == '(?:' + expected.p + ')'
				);
			});
			const P = `\\P{${ pattern }}`;
			it('rewrites `/' + P + '/u` correctly', () => {
				const transpiled = rewritePattern(P, 'u', features);
				assert(
					transpiled == expected.P ||
					transpiled == '(?:' + expected.P + ')'
				);
			});
		}
	}
	it('transpiles Unicode property escapes within various constructions', () => {
		assert.equal(
			rewritePattern('\\p{ASCII_Hex_Digit}', 'u', features),
			'[0-9A-Fa-f]'
		);
		assert.equal(
			rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', features),
			'(?:\\uD811[\\uDC00-\\uDE46])'
		);
		assert.equal(
			rewritePattern('\\p{ASCII_Hex_Digit}+', 'u', features),
			'[0-9A-Fa-f]+'
		);
		assert.equal(
			rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}+', 'u', features),
			'(?:\\uD811[\\uDC00-\\uDE46])+'
		);
		assert.equal(
			rewritePattern('[\\p{ASCII_Hex_Digit}_]', 'u', features),
			'[0-9A-F_a-f]'
		);
		assert.equal(
			rewritePattern('[\\P{Script_Extensions=Anatolian_Hieroglyphs}]', 'u', features),
			'(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uD810\\uD812-\\uDBFF][\\uDC00-\\uDFFF]|\\uD811[\\uDE47-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])'
		);
		assert.equal(
			rewritePattern('[\\p{Script_Extensions=Anatolian_Hieroglyphs}_]', 'u', features),
			'(?:_|\\uD811[\\uDC00-\\uDE46])'
		);
		assert.equal(
			rewritePattern('[\\P{Script_Extensions=Anatolian_Hieroglyphs}_]', 'u', features),
			'(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uD810\\uD812-\\uDBFF][\\uDC00-\\uDFFF]|\\uD811[\\uDE47-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])'
		);
		assert.equal(
			rewritePattern('(?:\\p{ASCII_Hex_Digit})', 'u', features),
			'(?:[0-9A-Fa-f])'
		);
		assert.equal(
			rewritePattern('(?:\\p{Script_Extensions=Anatolian_Hieroglyphs})', 'u', features),
			'(?:(?:\\uD811[\\uDC00-\\uDE46]))'
		);
	});
	it('throws without the `u` flag', () => {
		assert.throws(() => {
			rewritePattern('\\p{ASCII_Hex_Digit}', '', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{ASCII_Hex_Digit}', '', features);
		}, Error);
	});
	it('throws without the `unicodePropertyEscape` feature enabled', () => {
		assert.throws(() => {
			rewritePattern('\\p{ASCII_Hex_Digit}', 'u');
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{ASCII_Hex_Digit}', 'u');
		}, Error);
	});
	it('throws on unknown binary properties', () => {
		assert.throws(() => {
			rewritePattern('\\p{UnknownBinaryProperty}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{UnknownBinaryProperty}', 'u', features);
		}, Error);
	});
	it('throws on explicitly unsupported properties', () => {
		// https://github.com/tc39/proposal-regexp-unicode-property-escapes/issues/27
		assert.throws(() => {
			rewritePattern('\\P{Composition_Exclusion}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Expands_On_NFC}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Expands_On_NFD}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Expands_On_NFKC}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Expands_On_NFKD}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{FC_NFKC_Closure}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Full_Composition_Exclusion}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Grapheme_Link}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Hyphen}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Alphabetic}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Default_Ignorable_Code_Point}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Grapheme_Extend}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_ID_Continue}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_ID_Start}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Lowercase}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Math}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Uppercase}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Prepended_Concatenation_Mark}', 'u', features);
		}, Error);
	});
	it('throws on non-binary properties without a value', () => {
		assert.throws(() => {
			rewritePattern('\\p{General_Category}', 'u', features);
		}, Error);
	});
	it('throws on unknown property values', () => {
		assert.throws(() => {
			rewritePattern('\\p{General_Category=UnknownCategory}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{General_Category=UnknownCategory}', 'u', features);
		}, Error);
	});
	it('throws when loose matching is attempted', () => {
		assert.throws(() => {
			rewritePattern('\\p{gc=uppercaseletter}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\p{Block=Superscripts and Subscripts}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{_-_lOwEr_C-A_S-E_-_}', 'u', features);
		}, Error);
	});
	it('simplifies the output using Unicode code point escapes when `useUnicodeFlag` is enabled', () => {
		assert.equal(
			rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
				'unicodePropertyEscape': true,
				'useUnicodeFlag': true
			}),
			'[\\u{14400}-\\u{14646}]'
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

const dotAllFlagFixtures = [
	{
		'pattern': '.',
		'flags': 's',
		'expected': BMP_PATTERN
	},
	{
		'pattern': '.',
		'flags': 'gimsy',
		'expected': BMP_PATTERN
	},
	{
		'pattern': '.',
		'flags': 'su',
		'expected': UNICODE_PATTERN
	},
	{
		'pattern': '.',
		'flags': 'gimsuy',
		'expected': UNICODE_PATTERN
	}
];

describe('dotAllFlag', () => {
	const features = {
		'dotAllFlag': true
	};
	for (const fixture of dotAllFlagFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags;
		it('rewrites `/' + pattern + '/' + flags + '` correctly', () => {
			const transpiled = rewritePattern(pattern, flags, features);
			const expected = fixture.expected;
			assert(
				transpiled == expected ||
				transpiled == '(?:' + expected + ')'
			);
		});
	}
});
