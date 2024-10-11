const unicodePropertyEscapeFixtures = [
	{
		pattern: '\\p{ASCII_Hex_Digit}',
		expected: '[0-9A-Fa-f]'
	},
	{
		pattern: '\\p{Script_Extensions=Anatolian_Hieroglyphs}',
		expected: '(?:\\uD811[\\uDC00-\\uDE46])'
	},
	{
		pattern: '\\p{ASCII_Hex_Digit}+',
		expected: '[0-9A-Fa-f]+',
	},
	{
		pattern: '\\p{Script_Extensions=Anatolian_Hieroglyphs}+',
		expected: '(?:\\uD811[\\uDC00-\\uDE46])+',
	},
	{
		pattern: '[\\p{ASCII_Hex_Digit}_]',
		expected: '[0-9A-F_a-f]',
	},
	{
		pattern: '[^\\p{ASCII_Hex_Digit}_]',
		expected: '(?:[\\0-\\/:-@G-\\^`g-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
	},
	{
		pattern: '[\\P{Script_Extensions=Anatolian_Hieroglyphs}]',
		expected: '(?:[\\0-\\uFFFF]|[\\uD800-\\uD810\\uD812-\\uDBFF][\\uDC00-\\uDFFF]|\\uD811[\\uDE47-\\uDFFF])'
	},
	{
		pattern: '[\\p{Script_Extensions=Anatolian_Hieroglyphs}_]',
		expected: '(?:_|\\uD811[\\uDC00-\\uDE46])',
	},
	{
		pattern: '[\\P{Script_Extensions=Anatolian_Hieroglyphs}_]',
		expected: '(?:[\\0-\\uFFFF]|[\\uD800-\\uD810\\uD812-\\uDBFF][\\uDC00-\\uDFFF]|\\uD811[\\uDE47-\\uDFFF])',
	},
	{
		pattern: '(?:\\p{ASCII_Hex_Digit})',
		expected: '(?:[0-9A-Fa-f])',
	},
	{
		pattern: '(?:\\p{Script_Extensions=Anatolian_Hieroglyphs})',
		expected: '(?:(?:\\uD811[\\uDC00-\\uDE46]))',
	},
	{
		pattern: '(?:\\p{Script_Extensions=Wancho})',
		expected: '(?:(?:\\uD838[\\uDEC0-\\uDEF9\\uDEFF]))',
	},
	{
		pattern: '[\\p{ASCII}]',
		flags: 'iu',
		expected: '[\\0-\\x7F\\u017F\\u212A]',
		expectedFlags: 'iu',
		matches: ['k', 'K', '\u{212A}'],
		nonMatches: ['\u{0131}']
	},
	{
		pattern: '[^\\P{Lowercase_Letter}]',
		flags: 'iu',
		matches: ['\u{0131}'],
		nonMatches: ['0', ',', 'k', 'K', '\u{212A}']
	},
	// simplifies the output using Unicode code point escapes when not transforming the u flag
	{
		pattern: '\\p{Script_Extensions=Anatolian_Hieroglyphs}',
		options: {
			'unicodePropertyEscapes': 'transform',
		},
		expected: '[\\u{14400}-\\u{14646}]',
	},
	{
		pattern: '[\\P{Script_Extensions=Anatolian_Hieroglyphs}]',
		options: {
			'unicodePropertyEscapes': 'transform',
		},
		expected: '[\\0-\\u{143FF}\\u{14647}-\\u{10FFFF}]',
	},
	// should transpile to minimal case-insensitive set
	{
		pattern: '\u03B8',
		flags: 'iu',
		options: {
			'unicodeFlag': 'transform'
		},
		expected: '[\\u03B8\\u03F4]',
	},
	{
		pattern: '\u03B8',
		flags: 'iu',
		options: {},
		expected: '\\u03B8',
	},
	// should not replace `-` symbol when not in character class range
	{
		pattern: '-',
		options: {},
		expected: '-',
	},
	// should not transpile unicode property when unicodePropertyEscapes is not enabled
	{
		pattern: '\\p{ASCII_Hex_Digit}\\P{ASCII_Hex_Digit}',
		options: {},
		expected: '\\p{ASCII_Hex_Digit}\\P{ASCII_Hex_Digit}'
	},

	// throws on unknown binary properties
	{
		pattern: '\\p{UnknownBinaryProperty}',
		throws: /Unknown property: UnknownBinaryProperty/
	},
	{
		pattern: '\\P{UnknownBinaryProperty}',
		throws: /Unknown property: UnknownBinaryProperty/
	},
	// throws on explicitly unsupported properties
	// https://github.com/tc39/proposal-regexp-unicode-property-escapes/issues/27
	{
		pattern: '\\P{Composition_Exclusion}',
		throws: /Unknown property: Composition_Exclusion/
	},
	{
		pattern: '\\p{Expands_On_NFC}',
		throws: /Unknown property: Expands_On_NFC/
	},
	{
		pattern: '\\p{Expands_On_NFD}',
		throws: /Unknown property: Expands_On_NFD/
	},
	{
		pattern: '\\p{Expands_On_NFKC}',
		throws: /Unknown property: Expands_On_NFKC/
	},
	{
		pattern: '\\p{Expands_On_NFKD}',
		throws: /Unknown property: Expands_On_NFKD/
	},
	{
		pattern: '\\p{FC_NFKC_Closure}',
		throws: /Unknown property: FC_NFKC_Closure/
	},
	{
		pattern: '\\p{Full_Composition_Exclusion}',
		throws: /Unknown property: Full_Composition_Exclusion/
	},
	{
		pattern: '\\P{Grapheme_Link}',
		throws: /Unknown property: Grapheme_Link/
	},
	{
		pattern: '\\P{Hyphen}',
		throws: /Unknown property: Hyphen/
	},
	{
		pattern: '\\P{Other_Alphabetic}',
		throws: /Unknown property: Other_Alphabetic/
	},
	{
		pattern: '\\P{Other_Default_Ignorable_Code_Point}',
		throws: /Unknown property: Other_Default_Ignorable_Code_Point/
	},
	{
		pattern: '\\P{Other_Grapheme_Extend}',
		throws: /Unknown property: Other_Grapheme_Extend/
	},
	{
		pattern: '\\P{Other_ID_Continue}',
		throws: /Unknown property: Other_ID_Continue/
	},
	{
		pattern: '\\P{Other_ID_Start}',
		throws: /Unknown property: Other_ID_Start/
	},
	{
		pattern: '\\P{Other_Lowercase}',
		throws: /Unknown property: Other_Lowercase/
	},
	{
		pattern: '\\P{Other_Math}',
		throws: /Unknown property: Other_Math/
	},
	{
		pattern: '\\P{Other_Uppercase}',
		throws: /Unknown property: Other_Uppercase/
	},
	{
		pattern: '\\P{Prepended_Concatenation_Mark}',
		throws: /Unknown property: Prepended_Concatenation_Mark/
	},
	// throws on non-binary properties without a value
	{
		pattern: '\\p{General_Category}',
		throws: /Failed to recognize value `undefined` for property `General_Category`\./
	},
	// throws on unknown property values
	{
		pattern: '\\p{General_Category=UnknownCategory}',
		throws: /Unknown value `UnknownCategory` for property `General_Category`\./
	},
	{
		pattern: '\\P{General_Category=UnknownCategory}',
		throws: /Unknown value `UnknownCategory` for property `General_Category`\./
	},
	// throws when loose matching is attempted
	{
		pattern: '\\p{gc=uppercaseletter}',
		throws: /Unknown value `uppercaseletter` for property `General_Category`\./
	},
	{
		pattern: '\\p{Block=Superscripts and Subscripts}',
		throws: /Unknown property: Block/
	},
	{
		pattern: '\\P{_-_lOwEr_C-A_S-E_-_}',
		throws: /Unknown property: _-_lOwEr_C-A_S-E_-_/
	}
];

const unicodePropertyEscapePathExpressionsFixtures = [
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
	{
		'path': 'Script/Kawi',
		'expressions': [
			'sc=Kawi',
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

exports.unicodePropertyEscapeFixtures = unicodePropertyEscapeFixtures;
exports.unicodePropertyEscapePathExpressionsFixtures = unicodePropertyEscapePathExpressionsFixtures;