'use strict';

const assert = require('assert');
const regenerate = require('regenerate');
const rewritePattern = require('../rewrite-pattern.js');
const fixtures = require('regexpu-fixtures');

const BMP_SET = regenerate().addRange(0x0, 0xFFFF);
const BMP_PATTERN = BMP_SET.toString({ 'bmpOnly': true });
const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
const UNICODE_PATTERN = UNICODE_SET.toString();

describe('rewritePattern { unicodeFlag }', () => {
	const options = {
		'unicodeFlag': 'transform'
	};
	for (const fixture of fixtures) {
		const pattern = fixture.pattern;
		for (const flag of fixture.flags) {
			if (flag.includes('u')) {
				it('rewrites `/' + pattern + '/' + flag + '` correctly', () => {
					assert.equal(rewritePattern(pattern, flag, options), fixture.transpiled);
				});
			} else {
				it('leaves `/' + pattern + '/' + flag + '` as-is', () => {
					// TODO: Update regexpu-fixtures
					const expected = pattern.replace(/^\uD834\uDF06/g, '\\uD834\\uDF06');
					assert.equal(rewritePattern(pattern, flag, options), expected);
				});
			}
		}
	}
});

const unicodePropertyEscapeFixtures = [
	// https://unicode.org/reports/tr18/#RL1.2 item 1
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
	// https://unicode.org/reports/tr18/#RL1.2 item 2a
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
	// https://unicode.org/reports/tr18/#RL1.2 item 2b
	{
		'path': 'Script_Extensions/Greek',
		'expressions': [
			'scx=Grek',
			'scx=Greek',
			'Script_Extensions=Grek',
			'Script_Extensions=Greek'
		]
	},
	// https://unicode.org/reports/tr18/#RL1.2 item 3
	{
		'path': 'Binary_Property/Alphabetic',
		'expressions': [
			'Alpha',
			'Alphabetic'
		]
	},
	// https://unicode.org/reports/tr18/#RL1.2 item 4
	{
		'path': 'Binary_Property/Uppercase',
		'expressions': [
			'Upper',
			'Uppercase'
		]
	},
	// https://unicode.org/reports/tr18/#RL1.2 item 5
	{
		'path': 'Binary_Property/Lowercase',
		'expressions': [
			'Lower',
			'Lowercase'
		]
	},
	// https://unicode.org/reports/tr18/#RL1.2 item 6
	{
		'path': 'Binary_Property/White_Space',
		'expressions': [
			'WSpace',
			'White_Space'
		]
	},
	// https://unicode.org/reports/tr18/#RL1.2 item 7
	{
		'path': 'Binary_Property/Noncharacter_Code_Point',
		'expressions': [
			'NChar',
			'Noncharacter_Code_Point'
		]
	},
	// https://unicode.org/reports/tr18/#RL1.2 item 8
	{
		'path': 'Binary_Property/Default_Ignorable_Code_Point',
		'expressions': [
			'DI',
			'Default_Ignorable_Code_Point'
		]
	},
	// https://unicode.org/reports/tr18/#RL1.2 item 9a
	{
		'path': 'Binary_Property/Any',
		'expressions': [
			'Any'
		]
	},
	// https://unicode.org/reports/tr18/#RL1.2 item 9b
	{
		'path': 'Binary_Property/ASCII',
		'expressions': [
			'ASCII'
		]
	},
	// https://unicode.org/reports/tr18/#RL1.2 item 9c
	{
		'path': 'Binary_Property/Assigned',
		'expressions': [
			'Assigned'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/ASCII_Hex_Digit',
		'expressions': [
			'ASCII_Hex_Digit',
			'AHex'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	// {
	// 	'path': 'Bidi_Class/Arabic_Letter',
	// 	'expressions': [
	// 		'bc=AL',
	// 		'bc=Arabic_Letter',
	// 		'Bidi_Class=AL',
	// 		'Bidi_Class=Arabic_Letter'
	// 	]
	// },
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Bidi_Control',
		'expressions': [
			'Bidi_C',
			'Bidi_Control'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Bidi_Mirrored',
		'expressions': [
			'Bidi_M',
			'Bidi_Mirrored'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Case_Ignorable',
		'expressions': [
			'CI',
			'Case_Ignorable',
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Cased',
		'expressions': [
			'Cased'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_NFKC_Casefolded',
		'expressions': [
			'CWKCF',
			'Changes_When_NFKC_Casefolded'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Casefolded',
		'expressions': [
			'CWCF',
			'Changes_When_Casefolded'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Casemapped',
		'expressions': [
			'CWCM',
			'Changes_When_Casemapped'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Lowercased',
		'expressions': [
			'CWL',
			'Changes_When_Lowercased'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Titlecased',
		'expressions': [
			'CWT',
			'Changes_When_Titlecased'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Changes_When_Uppercased',
		'expressions': [
			'CWU',
			'Changes_When_Uppercased'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Dash',
		'expressions': [
			'Dash'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Deprecated',
		'expressions': [
			'Dep',
			'Deprecated'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Diacritic',
		'expressions': [
			'Dia',
			'Diacritic'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Extender',
		'expressions': [
			'Ext',
			'Extender'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Grapheme_Base',
		'expressions': [
			'Gr_Base',
			'Grapheme_Base'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Grapheme_Extend',
		'expressions': [
			'Gr_Ext',
			'Grapheme_Extend'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Hex_Digit',
		'expressions': [
			'Hex',
			'Hex_Digit'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/ID_Continue',
		'expressions': [
			'IDC',
			'ID_Continue'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/ID_Start',
		'expressions': [
			'IDS',
			'ID_Start'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Ideographic',
		'expressions': [
			'Ideo',
			'Ideographic'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/IDS_Binary_Operator',
		'expressions': [
			'IDSB',
			'IDS_Binary_Operator'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/IDS_Trinary_Operator',
		'expressions': [
			'IDST',
			'IDS_Trinary_Operator'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Join_Control',
		'expressions': [
			'Join_C',
			'Join_Control'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Logical_Order_Exception',
		'expressions': [
			'LOE',
			'Logical_Order_Exception'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Math',
		'expressions': [
			'Math'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Pattern_Syntax',
		'expressions': [
			'Pat_Syn',
			'Pattern_Syntax'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Pattern_White_Space',
		'expressions': [
			'Pat_WS',
			'Pattern_White_Space'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Quotation_Mark',
		'expressions': [
			'QMark',
			'Quotation_Mark'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Radical',
		'expressions': [
			'Radical'
		]
	},
	{
		'path': 'Binary_Property/Regional_Indicator',
		'expressions': [
			'RI',
			'Regional_Indicator'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Soft_Dotted',
		'expressions': [
			'SD',
			'Soft_Dotted'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Sentence_Terminal',
		'expressions': [
			'STerm',
			'Sentence_Terminal'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Terminal_Punctuation',
		'expressions': [
			'Term',
			'Terminal_Punctuation'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Unified_Ideograph',
		'expressions': [
			'UIdeo',
			'Unified_Ideograph'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/Variation_Selector',
		'expressions': [
			'VS',
			'Variation_Selector'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/XID_Continue',
		'expressions': [
			'XIDC',
			'XID_Continue'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	{
		'path': 'Binary_Property/XID_Start',
		'expressions': [
			'XIDS',
			'XID_Start'
		]
	},
	// https://unicode.org/reports/tr18/#RL2.7
	// {
	// 	'path': 'Bidi_Paired_Bracket_Type/Open',
	// 	'expressions': [
	// 		'bpt=o',
	// 		'bpt=Open',
	// 		'Bidi_Paired_Bracket_Type=o',
	// 		'Bidi_Paired_Bracket_Type=Open'
	// 	]
	// },
	// https://unicode.org/reports/tr51/
	{
		'path': 'Binary_Property/Emoji',
		'expressions': [
			'Emoji'
		]
	},
	// https://unicode.org/reports/tr51/
	{
		'path': 'Binary_Property/Emoji_Component',
		'expressions': [
			'Emoji_Component'
		]
	},
	// https://unicode.org/reports/tr51/
	{
		'path': 'Binary_Property/Emoji_Modifier',
		'expressions': [
			'Emoji_Modifier'
		]
	},
	// https://unicode.org/reports/tr51/
	{
		'path': 'Binary_Property/Emoji_Modifier_Base',
		'expressions': [
			'Emoji_Modifier_Base'
		]
	},
	// https://unicode.org/reports/tr51/
	{
		'path': 'Binary_Property/Emoji_Presentation',
		'expressions': [
			'Emoji_Presentation'
		]
	},
	// https://unicode.org/reports/tr51/proposed.html
	{
		'path': 'Binary_Property/Extended_Pictographic',
		'expressions': [
			'Extended_Pictographic'
		]
	},
	{
		'path': 'Script_Extensions/Yezidi',
		'expressions': [
			'scx=Yezi',
			'scx=Yezidi',
			'Script_Extensions=Yezi',
			'Script_Extensions=Yezidi',
		]
	},
	{
		'path': 'Script_Extensions/Toto',
		'expressions': [
			'scx=Toto',
			'Script_Extensions=Toto',
		]
	},
];

const getPropertyValuePattern = (path) => {
	const codePoints = require(`@unicode/unicode-14.0.0/${
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
			rewritePattern('[^\\p{ASCII_Hex_Digit}_]', 'u', features),
			'(?:(?![0-9A-F_a-f])[\\s\\S])'
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
		assert.equal(
			rewritePattern('(?:\\p{Script_Extensions=Wancho})', 'u', features),
			'(?:(?:\\uD838[\\uDEC0-\\uDEF9\\uDEFF]))'
		);
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
	it('simplifies the output using Unicode code point escapes when not transforming the u flag', () => {
		assert.equal(
			rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
				'unicodePropertyEscapes': 'transform',
			}),
			'[\\u{14400}-\\u{14646}]'
		);
		assert.equal(
			rewritePattern('[\\p{Script_Extensions=Anatolian_Hieroglyphs}]', 'u', {
				'unicodePropertyEscapes': 'transform',
			}),
			'[\\u{14400}-\\u{14646}]'
		);
	});
	it('should not transpile unicode property when unicodePropertyEscapes is not enabled', () => {
		assert.equal(
			rewritePattern('\\p{ASCII_Hex_Digit}\\P{ASCII_Hex_Digit}', 'u'),
			'\\p{ASCII_Hex_Digit}\\P{ASCII_Hex_Digit}'
		);
	});
	it('should transpile to minimal case-insensitive set', () => {
		assert.equal(
			rewritePattern('\u03B8', 'iu', {
				'unicodeFlag': 'transform'
			}),
			'[\\u03B8\\u03F4]'
		);
		assert.equal(
			rewritePattern('\u03B8', 'iu'),
			'\\u03B8'
		);
	});
});

const dotAllFlagFixtures = [
	{
		'pattern': '.',
		'flags': 's',
		'expected': '[\\s\\S]'
	},
	{
		'pattern': '.',
		'flags': 'gimsy',
		'expected': '[\\s\\S]'
	},
	{
		'pattern': '.',
		'flags': 's',
		'expected': '[\\s\\S]',
		'options': { unicodeFlag: 'transform' }
	},
	{
		'pattern': '.',
		'flags': 'gimsy',
		'expected': '[\\s\\S]',
		'options': { unicodeFlag: 'transform' }
	},
	{
		'pattern': '.',
		'flags': 'su',
		'expected': UNICODE_PATTERN,
		'options': { unicodeFlag: 'transform' }
	},
	{
		'pattern': '.',
		'flags': 'gimsuy',
		'expected': UNICODE_PATTERN,
		'options': { unicodeFlag: 'transform' }
	}
];

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

	it('not transformed', () => {
		it('leaves `/./su` as-is', () => {
			assert.equal(rewritePattern('.', 'su'), '.');
		});
	});
});

const namedGroupFixtures = [
	{
		'pattern': '(?<name>)\\k<name>',
		'flags': '',
		'expected': '()\\1',
		'expectedGroups': [
			['name', 1]
		]
	},
	{
		'pattern': '(?<name1>)(?<name2>)\\k<name1>\\k<name2>',
		'flags': '',
		'expected': '()()\\1\\2',
		'expectedGroups': [
			['name1', 1],
			['name2', 2]
		]
	},
	{
		'pattern': '()(?<name>)\\k<name>',
		'flags': '',
		'expected': '()()\\2',
		'expectedGroups': [
			['name', 2]
		]
	},
	{
		'pattern': '(?<name>)()\\1',
		'flags': '',
		'expected': '()()\\1'
	},
	{
		'pattern': '\\k<name>\\k<name>(?<name>)\\k<name>',
		'flags': '',
		'expected': '\\1\\1()\\1'
	},
	{
		'pattern': '(?<name>\\k<name>)',
		'flags': '',
		'expected': '(\\1)'
	},
	{
		'pattern': '(?<$𐒤>a)b\\k<$𐒤>',
		'flags': '',
		'expected': '(a)b\\1'
	},
	{
		'pattern': '(?<=a)(?<!b)(?=c)(?!d)(?:e)(?<name>f)\\k<name>',
		'flags': '',
		'expected': '(?<=a)(?<!b)(?=c)(?!d)(?:e)(f)\\1',
		'expectedGroups': [
			['name', 1]
		]
	}
];

describe('namedGroup', () => {
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

	it('multiple groups with the same name are disallowed', () => {
		assert.throws(() => {
			rewritePattern('(?<name>)(?<name>)', '', {
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

	it('should not transpile when namedGroup is not enabled', () => {
		let transpiled;
		const expected = '(?<name>)';
		assert.doesNotThrow(() => {
			transpiled = rewritePattern('(?<name>)', '');
		});
		assert.strictEqual(expected, transpiled);
	})
});

const characterClassFixtures = [
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'iu',
		expected: '(?![K\\u212A])[\\s\\S]',
		'options': { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'iu',
		expected: '(?![k\\u212A])[\\s\\S]',
		'options': { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'iu',
		expected: '(?![K\\u212A])[\\s\\S]',
		'options': { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'iu',
		expected: '[^K]',
		'options': {}
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'iu',
		expected: '[^k]',
		'options': {}
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'iu',
		expected: '[^\u212a]',
		'options': {}
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'u',
		expected: '(?!K)[\\s\\S]',
		'options': { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'u',
		expected: '(?!k)[\\s\\S]',
		'options': { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'u',
		expected: '(?!\\u212A)[\\s\\S]',
		'options': { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'u',
		expected: '[^K]',
		'options': {}
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'u',
		expected: '[^k]',
		'options': {}
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'u',
		expected: '[^\u212a]',
		'options': {}
	}
];

describe('character classes', () => {
	for (const fixture of characterClassFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags;
		const options = fixture.options;
		const transformUnicodeFlag = options.unicodeFlag === 'transform';
		it('rewrites `/' + pattern + '/' + flags + '` with' + (transformUnicodeFlag ? 'out' : '') + ' unicode correctly', () => {
			const transpiled = rewritePattern(pattern, flags, options);
			const expected = fixture.expected;
			if (transpiled != '(?:' + expected + ')') {
				assert.strictEqual(transpiled, expected);
			}
		});
	}
});

const TRANSFORM_U = { unicodeFlag: 'transform', unicodeSetsFlag: 'transform' };

const Basic_Emoji = {
	get all() { return `${this.strings}|[${this.chars}]` },
	strings: "🅰️|🅱️|🅾️|🅿️|🈂️|🈷️|🌡️|🌤️|🌥️|🌦️|🌧️|🌨️|🌩️|🌪️|🌫️|🌬️|🌶️|🍽️|🎖️|🎗️|🎙️|🎚️|🎛️|🎞️|🎟️|🏋️|🏌️|🏍️|🏎️|🏔️|🏕️|🏖️|🏗️|🏘️|🏙️|🏚️|🏛️|🏜️|🏝️|🏞️|🏟️|🏳️|🏵️|🏷️|🐿️|👁️|📽️|🕉️|🕊️|🕯️|🕰️|🕳️|🕴️|🕵️|🕶️|🕷️|🕸️|🕹️|🖇️|🖊️|🖋️|🖌️|🖍️|🖐️|🖥️|🖨️|🖱️|🖲️|🖼️|🗂️|🗃️|🗄️|🗑️|🗒️|🗓️|🗜️|🗝️|🗞️|🗡️|🗣️|🗨️|🗯️|🗳️|🗺️|🛋️|🛍️|🛎️|🛏️|🛠️|🛡️|🛢️|🛣️|🛤️|🛥️|🛩️|🛰️|🛳️|©️|®️|‼️|⁉️|™️|ℹ️|↔️|↕️|↖️|↗️|↘️|↙️|↩️|↪️|⌨️|⏏️|⏭️|⏮️|⏯️|⏱️|⏲️|⏸️|⏹️|⏺️|Ⓜ️|▪️|▫️|▶️|◀️|◻️|◼️|☀️|☁️|☂️|☃️|☄️|☎️|☑️|☘️|☝️|☠️|☢️|☣️|☦️|☪️|☮️|☯️|☸️|☹️|☺️|♀️|♂️|♟️|♠️|♣️|♥️|♦️|♨️|♻️|♾️|⚒️|⚔️|⚕️|⚖️|⚗️|⚙️|⚛️|⚜️|⚠️|⚧️|⚰️|⚱️|⛈️|⛏️|⛑️|⛓️|⛩️|⛰️|⛱️|⛴️|⛷️|⛸️|⛹️|✂️|✈️|✉️|✌️|✍️|✏️|✒️|✔️|✖️|✝️|✡️|✳️|✴️|❄️|❇️|❣️|❤️|➡️|⤴️|⤵️|⬅️|⬆️|⬇️|〰️|〽️|㊗️|㊙️",
	chars: "\\u231A\\u231B\\u23E9-\\u23EC\\u23F0\\u23F3\\u25FD\\u25FE\\u2614\\u2615\\u2648-\\u2653\\u267F\\u2693\\u26A1\\u26AA\\u26AB\\u26BD\\u26BE\\u26C4\\u26C5\\u26CE\\u26D4\\u26EA\\u26F2\\u26F3\\u26F5\\u26FA\\u26FD\\u2705\\u270A\\u270B\\u2728\\u274C\\u274E\\u2753-\\u2755\\u2757\\u2795-\\u2797\\u27B0\\u27BF\\u2B1B\\u2B1C\\u2B50\\u2B55\\u{1F004}\\u{1F0CF}\\u{1F18E}\\u{1F191}-\\u{1F19A}\\u{1F201}\\u{1F21A}\\u{1F22F}\\u{1F232}-\\u{1F236}\\u{1F238}-\\u{1F23A}\\u{1F250}\\u{1F251}\\u{1F300}-\\u{1F320}\\u{1F32D}-\\u{1F335}\\u{1F337}-\\u{1F37C}\\u{1F37E}-\\u{1F393}\\u{1F3A0}-\\u{1F3CA}\\u{1F3CF}-\\u{1F3D3}\\u{1F3E0}-\\u{1F3F0}\\u{1F3F4}\\u{1F3F8}-\\u{1F43E}\\u{1F440}\\u{1F442}-\\u{1F4FC}\\u{1F4FF}-\\u{1F53D}\\u{1F54B}-\\u{1F54E}\\u{1F550}-\\u{1F567}\\u{1F57A}\\u{1F595}\\u{1F596}\\u{1F5A4}\\u{1F5FB}-\\u{1F64F}\\u{1F680}-\\u{1F6C5}\\u{1F6CC}\\u{1F6D0}-\\u{1F6D2}\\u{1F6D5}-\\u{1F6D7}\\u{1F6DD}-\\u{1F6DF}\\u{1F6EB}\\u{1F6EC}\\u{1F6F4}-\\u{1F6FC}\\u{1F7E0}-\\u{1F7EB}\\u{1F7F0}\\u{1F90C}-\\u{1F93A}\\u{1F93C}-\\u{1F945}\\u{1F947}-\\u{1F9FF}\\u{1FA70}-\\u{1FA74}\\u{1FA78}-\\u{1FA7C}\\u{1FA80}-\\u{1FA86}\\u{1FA90}-\\u{1FAAC}\\u{1FAB0}-\\u{1FABA}\\u{1FAC0}-\\u{1FAC5}\\u{1FAD0}-\\u{1FAD9}\\u{1FAE0}-\\u{1FAE7}\\u{1FAF0}-\\u{1FAF6}"
};

const unicodeSetFixtures = [
	{
		pattern: '[[a-h]&&[f-z]]',
		expected: '[f-h]'
	},
	{
		pattern: '[[a-h]&&[f-z]&&[p-z]]',
		expected: '[]'
	},
	{
		pattern: '[[a-h]&&[b]]',
		expected: 'b'
	},
	{
		pattern: '[[a-h]&&b]',
		expected: 'b'
	},
	{
		pattern: '[[g-z]&&b]',
		expected: '[]'
	},
	{
		pattern: '[[a-h]&&[^f-z]]',
		expected: '[a-e]'
	},
	{
		pattern: '[[a-h]&&[^f-z]&&[p-z]]',
		expected: '[]'
	},
	{
		pattern: '[[a-h]&&[^f-z]&&[^p-z]]',
		expected: '[a-e]'
	},
	{
		pattern: '[[a-h]&&[^b]]',
		expected: '[ac-h]'
	},
	{
		pattern: '[[a-h]--[f-z]]',
		expected: '[a-e]'
	},
	{
		pattern: '[[a-h]--[f-z]--[p-z]]',
		expected: '[a-e]'
	},
	{
		pattern: '[[a-z]--[d-k]--[s-w]]',
		expected: '[a-cl-rx-z]'
	},
	{
		pattern: '[[a-h]--[b]]',
		expected: '[ac-h]'
	},
	{
		pattern: '[[b]--[a-h]]',
		expected: '[]'
	},
	{
		pattern: '[[a-h]--b]',
		expected: '[ac-h]'
	},
	{
		pattern: '[b--[a-h]]',
		expected: '[]'
	},
	{
		pattern: '[[g-z]--b]',
		expected: '[g-z]'
	},
	{
		pattern: '[b--[g-z]]',
		expected: 'b'
	},
	{
		pattern: '[[a-h]--[^f-z]]',
		expected: '[f-h]'
	},
	{
		pattern: '[[a-h]--[^f-z]--[p-z]]',
		expected: '[f-h]'
	},
	{
		pattern: '[[a-h]--[^f-z]--[^p-z]]',
		expected: '[]'
	},
	{
		pattern: '[[a-h]--[^b]]',
		expected: 'b'
	},
	{
		pattern: '[[a-z][f-h]]',
		expected: '[a-z]'
	},
	{
		pattern: '[^[a-z][f-h]]',
		expected: '[^a-z]'
	},
	{
		pattern: '[^[a-z][f-h]]',
		expected: '(?:(?![a-z])[\\s\\S])',
		options: TRANSFORM_U
	},
	{
		pattern: '[[^a-z][f-h]]',
		expected: '[\\0-`f-h\\{-\\u{10FFFF}]'
	},
	{
		pattern: '[[^a-z][f-h]]',
		expected: '(?:[\\0-`f-h\\{-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])',
		options: TRANSFORM_U
	},
	{
		pattern: '[\\q{A|AB|B|ABC|BC}ab]',
		expected: '(?:ABC|AB|BC|[ABab])'
	},
	{
		pattern: '[\\q{A|AB}a\\q{B|ABC|BC}b]',
		expected: '(?:ABC|AB|BC|[ABab])'
	},
	{
		pattern: '[\\q{A|AB}ab\\q{B|ABC|BC}]',
		expected: '(?:ABC|AB|BC|[ABab])'
	},
	{
		pattern: '[[\\q{A|AB}a]b\\q{B|ABC|BC}]',
		expected: '(?:ABC|AB|BC|[ABab])'
	},
	{
		pattern: '[\\q{👩🏿‍✈️|🚲|🇧🇪}]',
		expected: '(?:👩🏿‍✈️|🇧🇪|\\u{1F6B2})'
	},
	{
		pattern: '[ab\\q{}]',
		expected: '(?:[ab]|)'
	},
	{
		pattern: '[ab\\q{|}]',
		expected: '(?:[ab]|)'
	},
	{
		pattern: '[ab\\q{|A|AB}]',
		expected: '(?:AB|[Aab]|)'
	},
	{
		pattern: '[\\q{sA}asb]',
		flags: 'iv',
		expected: '(?:sA|[abs])'
	},
	{
		pattern: '[\\q{sA}asb]',
		flags: 'iv',
		options: TRANSFORM_U,
		expected: '(?:[s\\u017F]A|[abs\\u017F])'
	},
	{
		pattern: '[[ab\\q{cd}]--a]',
		expected: '(?:cd|b)'
	},
	{
		pattern: '[[ab\\q{cd}]--[ab]]',
		expected: '(?:cd)'
	},
	{
		pattern: '[[ab\\q{cd}]--[cd]]',
		expected: '(?:cd|[ab])'
	},
	{
		pattern: '[[ab\\q{cd}]--\\q{cd}]',
		expected: '[ab]'
	},
	{
		pattern: '[[ab\\q{cd}]--[a\\q{cd}]]',
		expected: 'b'
	},
	{
		pattern: '[[ab\\q{cd}]--[ab\\q{cd}]]',
		expected: '[]'
	},
	{
		pattern: '[[ab]--[ab\\q{cd}]]',
		expected: '[]'
	},
	{
		pattern: '[\\q{cd}--[ab\\q{cd}]]',
		expected: '[]'
	},
	{
		pattern: '[\\q{cd}--[ab\\q{dc}]]',
		expected: '(?:cd)'
	},
	{
		pattern: '[\\q{ab|cd|abc}--\\q{abc|cd}]',
		expected: '(?:ab)'
	},
	{
		pattern: '[\\q{ab|cd|abc}--\\q{abc}--\\q{cd}]',
		expected: '(?:ab)'
	},
	{
		pattern: '[a&&\\q{a}]',
		expected: 'a'
	},
	{
		pattern: '[a&&\\q{ab}]',
		expected: '[]'
	},
	{
		pattern: '[\\q{ab}&&\\q{ab}]',
		expected: '(?:ab)'
	},
	{
		pattern: '[\\q{ab|cd|abc}&&\\q{ab|bc|abc}]',
		expected: '(?:abc|ab)'
	},
	{
		pattern: '[[a\\q{ab}]&&\\q{ab}]',
		expected: '(?:ab)'
	},
	{
		pattern: '[[a\\q{ab}]&&a]',
		expected: 'a'
	},
	{
		pattern: '[^\\q{a}]',
		expected: '[^a]'
	},
	{
		pattern: '[^\\q{abc}]',
		throws: /Cannot negate set containing strings/
	},
	{
		pattern: '[^\\q{}]',
		throws: /Cannot negate set containing strings/
	},
	{
		pattern: '[^\\q{a|}]',
		throws: /Cannot negate set containing strings/
	},
	{
		pattern: '[^\\q{}--\\q{}]',
		throws: /Cannot negate set containing strings/
	},
	{
		pattern: '[^\\q{ab}--\\q{ab}]',
		throws: /Cannot negate set containing strings/
	},
	{
		pattern: '[^\\q{a}--\\q{ab}]',
		expected: '[^a]'
	},
	{
		pattern: '[^[\\q{ab}--\\q{ab}]]',
		throws: /Cannot negate set containing strings/
	},
	{
		pattern: '[^\\q{}&&a]',
		expected: '[^]'
	},
	{
		pattern: '[^\\q{ab}&&a]',
		expected: '[^]'
	},
	{
		pattern: '[^\\q{}&&\\q{}]',
		throws: /Cannot negate set containing strings/
	},
	{
		pattern: '[^\\q{ab}&&\\q{ab}]',
		throws: /Cannot negate set containing strings/
	},
	{
		pattern: '[^\\q{}&&\\q{ab}]',
		throws: /Cannot negate set containing strings/
	},
	{
		pattern: '\\p{Basic_Emoji}',
		expected: `(?:${Basic_Emoji.all})`
	},
	{
		pattern: '[\\p{Basic_Emoji}]',
		expected: `(?:${Basic_Emoji.all})`
	},
	{
		pattern: '[\\p{Basic_Emoji}&&\\p{Basic_Emoji}]',
		expected: `(?:${Basic_Emoji.all})`
	},
	{
		pattern: '[\\p{Basic_Emoji}&&[\\u{0}-\\u{10ffff}]]',
		expected: `[${Basic_Emoji.chars}]`
	},
	{
		pattern: '[\\p{Basic_Emoji}\\p{Emoji}]',
		expected: `(?:${Basic_Emoji.strings}|[#\\*0-9\\xA9\\xAE\\u203C\\u2049\\u2122\\u2139\\u2194-\\u2199\\u21A9\\u21AA\\u231A\\u231B\\u2328\\u23CF\\u23E9-\\u23F3\\u23F8-\\u23FA\\u24C2\\u25AA\\u25AB\\u25B6\\u25C0\\u25FB-\\u25FE\\u2600-\\u2604\\u260E\\u2611\\u2614\\u2615\\u2618\\u261D\\u2620\\u2622\\u2623\\u2626\\u262A\\u262E\\u262F\\u2638-\\u263A\\u2640\\u2642\\u2648-\\u2653\\u265F\\u2660\\u2663\\u2665\\u2666\\u2668\\u267B\\u267E\\u267F\\u2692-\\u2697\\u2699\\u269B\\u269C\\u26A0\\u26A1\\u26A7\\u26AA\\u26AB\\u26B0\\u26B1\\u26BD\\u26BE\\u26C4\\u26C5\\u26C8\\u26CE\\u26CF\\u26D1\\u26D3\\u26D4\\u26E9\\u26EA\\u26F0-\\u26F5\\u26F7-\\u26FA\\u26FD\\u2702\\u2705\\u2708-\\u270D\\u270F\\u2712\\u2714\\u2716\\u271D\\u2721\\u2728\\u2733\\u2734\\u2744\\u2747\\u274C\\u274E\\u2753-\\u2755\\u2757\\u2763\\u2764\\u2795-\\u2797\\u27A1\\u27B0\\u27BF\\u2934\\u2935\\u2B05-\\u2B07\\u2B1B\\u2B1C\\u2B50\\u2B55\\u3030\\u303D\\u3297\\u3299\\u{1F004}\\u{1F0CF}\\u{1F170}\\u{1F171}\\u{1F17E}\\u{1F17F}\\u{1F18E}\\u{1F191}-\\u{1F19A}\\u{1F1E6}-\\u{1F1FF}\\u{1F201}\\u{1F202}\\u{1F21A}\\u{1F22F}\\u{1F232}-\\u{1F23A}\\u{1F250}\\u{1F251}\\u{1F300}-\\u{1F321}\\u{1F324}-\\u{1F393}\\u{1F396}\\u{1F397}\\u{1F399}-\\u{1F39B}\\u{1F39E}-\\u{1F3F0}\\u{1F3F3}-\\u{1F3F5}\\u{1F3F7}-\\u{1F4FD}\\u{1F4FF}-\\u{1F53D}\\u{1F549}-\\u{1F54E}\\u{1F550}-\\u{1F567}\\u{1F56F}\\u{1F570}\\u{1F573}-\\u{1F57A}\\u{1F587}\\u{1F58A}-\\u{1F58D}\\u{1F590}\\u{1F595}\\u{1F596}\\u{1F5A4}\\u{1F5A5}\\u{1F5A8}\\u{1F5B1}\\u{1F5B2}\\u{1F5BC}\\u{1F5C2}-\\u{1F5C4}\\u{1F5D1}-\\u{1F5D3}\\u{1F5DC}-\\u{1F5DE}\\u{1F5E1}\\u{1F5E3}\\u{1F5E8}\\u{1F5EF}\\u{1F5F3}\\u{1F5FA}-\\u{1F64F}\\u{1F680}-\\u{1F6C5}\\u{1F6CB}-\\u{1F6D2}\\u{1F6D5}-\\u{1F6D7}\\u{1F6DD}-\\u{1F6E5}\\u{1F6E9}\\u{1F6EB}\\u{1F6EC}\\u{1F6F0}\\u{1F6F3}-\\u{1F6FC}\\u{1F7E0}-\\u{1F7EB}\\u{1F7F0}\\u{1F90C}-\\u{1F93A}\\u{1F93C}-\\u{1F945}\\u{1F947}-\\u{1F9FF}\\u{1FA70}-\\u{1FA74}\\u{1FA78}-\\u{1FA7C}\\u{1FA80}-\\u{1FA86}\\u{1FA90}-\\u{1FAAC}\\u{1FAB0}-\\u{1FABA}\\u{1FAC0}-\\u{1FAC5}\\u{1FAD0}-\\u{1FAD9}\\u{1FAE0}-\\u{1FAE7}\\u{1FAF0}-\\u{1FAF6}])`
	},
	{
		pattern: '[\\p{Basic_Emoji}&&\\q{🇮🇴|dog}]',
		expected: '[]'
	},
	{
		pattern: '[\\p{RGI_Emoji_Flag_Sequence}&&\\q{🇮🇴|dog}]',
		expected: '🇮🇴'
	},
	{
		pattern: '[\\p{Basic_Emoji}\\q{JavaScript|ECMAScript}]',
		expected: `(?:JavaScript|ECMAScript|${Basic_Emoji.all})`
	},
	{
		pattern: '[\\p{Basic_Emoji}&&\\q{😷|©️|dog}]',
		expected: '(?:©️|\\u{1F637})'
	},
	{
		pattern: '\\P{Basic_Emoji}',
		throws: /Cannot negate Unicode property of strings/
	},
	{
		pattern: '[^\\p{Basic_Emoji}]',
		throws: /Cannot negate set containing strings/
	}
];

describe('unicodeSets (v) flag', () => {
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
				const transpiled = rewritePattern(pattern, flags, options);
				if (transpiled != '(?:' + expected + ')') {
					assert.strictEqual(transpiled, expected);
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

