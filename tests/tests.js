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
];

const getPropertyValuePattern = (path) => {
	const codePoints = require(`unicode-13.0.0/${
		path }/code-points.js`);
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
	it('throws without the `u` flag', () => {
		assert.throws(() => {
			rewritePattern('\\p{ASCII_Hex_Digit}', '', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{ASCII_Hex_Digit}', '', features);
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
	it('should not transpile unicode property when unicodePropertyEscape is not enabled', () => {
		assert.equal(
			rewritePattern('\\p{ASCII_Hex_Digit}\\P{ASCII_Hex_Digit}', 'u'),
			'\\p{ASCII_Hex_Digit}\\P{ASCII_Hex_Digit}'
		);
	});
	it('should transpile to minimal case-insensitive set', () => {
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
			if (transpiled != '(?:' + expected + ')') {
				assert.strictEqual(transpiled, expected);
			}
		});
	}
});

const useDotAllFlagFixtures = [
	{
		'pattern': '.',
		'flags': 'su',
		'expected': '.'
	}
]

describe('useDotAllFlag', () => {
	const features = {
		'useDotAllFlag': true
	};
	for (const fixture of useDotAllFlagFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags;
		it('rewrites `/' + pattern + '/' + flags + '` correctly', () => {
			const transpiled = rewritePattern(pattern, flags, features);
			const expected = fixture.expected;
			if (transpiled != '(?:' + expected + ')') {
				assert.strictEqual(transpiled, expected);
			}
		});
	}
	it('should throw when both `useDotAllFlag` and `dotAll` is true', () => {
		assert.throws(() => {
			rewritePattern('.', 's', {
				useDotAllFlag: true,
				dotAllFlag: true
			});
		}, Error, '`useDotAllFlag` and `dotAllFlag` cannot both be true!')
	})
})

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
		],
		'options': {
			'lookbehind': true
		}
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
			'namedGroup': true,
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
				'namedGroup': true
			});
		});
		assert.strictEqual(transpiled, expected);
	});

	it('multiple groups with the same name are disallowed', () => {
		assert.throws(() => {
			rewritePattern('(?<name>)(?<name>)', '', {
				'namedGroup': true
			});
		});
	});

	it('named references must reference a group', () => {
		assert.throws(() => {
			rewritePattern('\\k<name>', '', {
				'namedGroup': true
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

const lookbehindFixtures = [
	{
		'pattern': '(?<=a)b',
		'flags': '',
		'expected': '(?<=a)b'
	},
	{
		'pattern': '(?<=.)a',
		'flags': '',
		'expected': '(?<=.)a'
	}
]

describe('lookbehind', () => {
	for (const fixture of lookbehindFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags;
		const expected = fixture.expected;
		it('rewrites `/' + pattern + '/' + flags + '` correctly', () => {
			const groups = [];
			const transpiled = rewritePattern(pattern, flags, {
				'lookbehind': true
			});
			assert.strictEqual(transpiled, expected);
		});
	}
})

const characterClassFixtures = [
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'iu',
		expected: '(?![K\\u212A])[\\s\\S]'
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'iu',
		expected: '(?![k\\u212A])[\\s\\S]'
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'iu',
		expected: '(?![K\\u212A])[\\s\\S]'
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'iu',
		expected: '(?!K)[\\s\\S]',
		useUnicodeFlag: true
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'iu',
		expected: '(?!k)[\\s\\S]',
		useUnicodeFlag: true
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'iu',
		expected: '(?!\\u212A)[\\s\\S]',
		useUnicodeFlag: true
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'u',
		expected: '(?!K)[\\s\\S]'
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'u',
		expected: '(?!k)[\\s\\S]'
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'u',
		expected: '(?!\\u212A)[\\s\\S]'
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'u',
		expected: '(?!K)[\\s\\S]',
		useUnicodeFlag: true
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'u',
		expected: '(?!k)[\\s\\S]',
		useUnicodeFlag: true
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'u',
		expected: '(?!\\u212A)[\\s\\S]',
		useUnicodeFlag: true
	}
];

describe('character classes', () => {
	for (const fixture of characterClassFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags;
		const useUnicodeFlag = fixture.useUnicodeFlag;
		it('rewrites `/' + pattern + '/' + flags + '` with' + (useUnicodeFlag ? '' : 'out') + ' unicode correctly', () => {
			const transpiled = rewritePattern(pattern, flags, {
				'useUnicodeFlag': useUnicodeFlag
			});
			const expected = fixture.expected;
			const features = fixture.features;
			if (transpiled != '(?:' + expected + ')') {
				assert.strictEqual(transpiled, expected);
			}
		});
	}
});

