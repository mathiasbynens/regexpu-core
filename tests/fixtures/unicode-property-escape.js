const unicodePropertyEscapeFixtures = [];

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