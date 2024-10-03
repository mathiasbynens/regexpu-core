const IS_NODE_6 = process.version.startsWith('v6.');

const modifiersFixtures = [
	// +i
	{
		'pattern': '(?i:a)',
		'expected': '(?:[Aa])',
	},
	{
		'pattern': '(?i:[a-z])',
		'expected': '(?:[A-Za-z])',
	},
	{
		'pattern': '(?i:[ab])',
		'expected': '(?:[ABab])',
	},
	{
		'pattern': '(?i:\\u212A)',
		'matches': ['\u212A'],
		'nonMatches': ['K', 'k'],
		'expected': '(?:\\u212A)',
	},
	{
		'pattern': '(?i:\\u212A)',
		'flags': 'u',
		'matches': ['K', 'k', '\u212A'],
		'expected': '(?:[Kk\\u212A])',
	},
	{
		'pattern': '(?i:k)',
		'flags': 'u',
		'expected': '(?:[Kk\\u212A])',
	},
	{
		'pattern': '(?i:\\u2C2F)',
		'matches': ['\u2C2F', '\u2C5F'],
		'expected': '(?:[\\u2C2F\\u2C5F])'
	},
	{
		'pattern': '(?i:[a-z])',
		'flags': 'u',
		'options':  { unicodeFlag: 'transform', modifiers: 'transform' },
		'expected': '(?:[A-Za-z\\u017F\\u212A])',
		'expectedFlags': '',
	},
	{
		'pattern': '(?i:[ks])',
		'flags': 'u',
		'options':  { modifiers: 'transform' },
		'expected': '(?:[KSks\\u017F\\u212A])',
		'expectedFlags': 'u',
	},
	{
		'pattern': '(?i:[\\q{ab|cd|abc}--\\q{abc}--\\q{cd}])',
		'flags': 'v',
		'options':  { unicodeSetsFlag: 'transform', modifiers: 'transform' },
		'expected': '(?:(?:[Aa][Bb]))',
		'expectedFlags': 'u',
	},
	{
		'pattern': '(?i:[\\q{ab|cd|abc}--\\q{abc}--\\q{cd}])',
		'flags': 'v',
		'options':  { unicodeSetsFlag: 'transform', modifiers: 'parse' },
		'expected': '(?i:(?:ab))',
		'expectedFlags': 'u',
	},	{
		'pattern': '(?i:[\\q{ab|cd|abc}--\\q{abc}--\\q{cd}])',
		'flags': 'v',
		'options':  { unicodeSetsFlag: 'transform', unicodeFlag: 'transform', modifiers: 'transform' },
		'expected': '(?:(?:[Aa][Bb]))',
		'expectedFlags': '',
	},
	{
		'pattern': '(?i:є)',
		'options': { modifiers: 'transform' },
		'expected': '(?:[\\u0404\\u0454])',
	},
	{
		'pattern': '(?i:[є-ґ])',
		'options': { modifiers: 'transform' },
		'matches': ['\u0462', '\u0463', '\u1C87'],
		'expected': '(?:[\\u0404-\\u040F\\u0454-\\u0491\\u1C87])',
	},
	{
		'pattern': '(?i:[Жщ])',
		'options': { modifiers: 'transform' },
		'expected': '(?:[\\u0416\\u0429\\u0436\\u0449])',
	},
	{
		'pattern': '(?i:\\u{10570})',
		'flags': 'u',
		'options': { modifiers: 'transform' },
		'expected': '(?:[\\u{10570}\\u{10597}])'
	},
	{
		'pattern': '(?i:a.)',
		'flags': 's',
		'expected': '(?:[Aa].)',
		'expectedFlags': 's'
	},
	{
		'pattern': '(?i:a.)',
		'flags': 's',
		'options': { modifiers: 'transform', dotAllFlag: 'transform' },
		'expected': '(?:[Aa][^])',
		'expectedFlags': ''
	},
	!IS_NODE_6 && {
		'pattern': '(?i:\\p{Lowercase_Letter})k',
		'flags': 'u',
		'options': { modifiers: 'transform' },
		'matches': ['ck', 'Ck', 'δk', 'Δk', '\u{118A8}k', '\u{118C8}k'],
		'nonMatches': ['cK', 'CK', 'δK', 'ΔK', '\u{118A8}K', '\u{118C8}K', 'c\u212A', 'C\u212A'],
		'expectedFlags': 'u'
	},
	!IS_NODE_6 && {
		'pattern': '(?i:\\p{Lowercase_Letter})k',
		'flags': 'u',
		'options': { unicodePropertyEscapes: 'transform', modifiers: 'transform' },
		'matches': ['ck', 'Ck', 'δk', 'Δk', '\u{118A8}k', '\u{118C8}k'],
		'nonMatches': ['cK', 'CK', 'δK', 'ΔK', '\u{118A8}K', '\u{118C8}K', 'c\u212A', 'C\u212A'],
		'expectedFlags': 'u'
	},
	{
		'pattern': '(?i:[\\p{Lowercase_Letter}&&\\p{ASCII}])a',
		'flags': 'v',
		'options': { unicodeSetsFlag: 'transform', modifiers: 'transform' },
		'expected': '(?:[A-Za-z\\u017F\\u212A])a',
		'expectedFlags': 'u'
	},
	{
		'pattern': '(?i:[\\p{Lowercase_Letter}&&\\p{ASCII}])a',
		'flags': 'v',
		'options': { unicodeSetsFlag: 'transform', unicodePropertyEscapes: 'transform', modifiers: 'transform' },
		'expected': '(?:[A-Za-z\\u017F\\u212A])a',
		'expectedFlags': 'u'
	},
	// +m
	{
		'pattern': '(?m:^[a-z])',
		'expected': '(?:(?:^|(?<=[\\n\\r\\u2028\\u2029]))[a-z])',
	},
	{
		'pattern': '(?m:[a-z]$)',
		'expected': '(?:[a-z](?:$|(?=[\\n\\r\\u2028\\u2029])))',
	},
	// +s
	{
		'pattern': '(?s:.)',
		'expected': '(?:[^])',
	},
	// -i
	{
		'pattern': '(?-i:a)(a)',
		'flags': 'i',
		'expected': '(?:a)([Aa])',
		'expectedFlags': '',
	},
	{
		'pattern': '(?-i:[a-z])([a-z])',
		'flags': 'i',
		'expected': '(?:[a-z])([A-Za-z])',
		'expectedFlags': '',
	},
	{
		'pattern': '(?-i:[a-z])([a-z])',
		'flags': 'iu',
		'options':  { unicodeFlag: 'transform', modifiers: 'transform' },
		'expected': '(?:[a-z])([A-Za-z\\u017F\\u212A])',
		'expectedFlags': '',
	},
	{
		'pattern': '(?-i:[\\q{ab|cd|abc}--\\q{abc}--\\q{cd}])',
		'flags': 'iv',
		'options':  { unicodeSetsFlag: 'transform', modifiers: 'transform' },
		'expected': '(?:(?:ab))',
		'expectedFlags': 'u',
	},
	{
		'pattern': '(?-i:[\\q{ab|cd|abc}--\\q{abc}--\\q{cd}])',
		'flags': 'iv',
		'options':  { unicodeSetsFlag: 'transform', modifiers: 'parse' },
		'expected': '(?-i:(?:ab))',
		'expectedFlags': 'iu',
	},	{
		'pattern': '(?-i:[\\q{ab|cd|abc}--\\q{abc}--\\q{cd}])',
		'flags': 'iv',
		'options':  { unicodeSetsFlag: 'transform', unicodeFlag: 'transform', modifiers: 'transform' },
		'expected': '(?:(?:ab))',
		'expectedFlags': '',
	},
	{
		'pattern': '(a(?-i:a))',
		'expected': '(a(?:a))'
	},
	{
		'pattern': '(a(?-i:a))',
		'flags': 'i',
		'expected': '([Aa](?:a))',
		'expectedFlags': ''
	},
	{
		'pattern': '\\p{Lowercase_Letter}(?-i:k)',
		'flags': 'iu',
		'options': { modifiers: 'transform' },
		'matches': ['ck', 'Ck', 'δk', 'Δk', '\u{118A8}k', '\u{118C8}k'],
		'nonMatches': ['cK', 'CK', 'δK', 'ΔK', '\u{118A8}K', '\u{118C8}K', 'c\u212A', 'C\u212A'],
		'expectedFlags': 'u'
	},
	{
		'pattern': '\\p{Lowercase_Letter}(?-i:k)',
		'flags': 'iu',
		'options': { unicodePropertyEscapes: 'transform', modifiers: 'transform' },
		'matches': ['ck', 'Ck', 'δk', 'Δk', '\u{118A8}k', '\u{118C8}k'],
		'nonMatches': ['cK', 'CK', 'δK', 'ΔK', '\u{118A8}K', '\u{118C8}K', 'c\u212A', 'C\u212A'],
		'expectedFlags': 'u'
	},
	{
		'pattern': '[\\p{Lowercase_Letter}&&\\p{ASCII}](?-i:a)',
		'flags': 'iv',
		'options': { unicodeSetsFlag: 'transform', modifiers: 'transform' },
		'expected': '[A-Za-z\\u017F\\u212A](?:a)',
		'expectedFlags': 'u'
	},
	{
		'pattern': '[\\p{Lowercase_Letter}&&\\p{ASCII}](?-i:a)',
		'flags': 'iv',
		'options': { unicodeSetsFlag: 'transform', unicodePropertyEscapes: 'transform', modifiers: 'transform' },
		'expected': '[A-Za-z\\u017F\\u212A](?:a)',
		'expectedFlags': 'u'
	},
	// -m
	{
		'pattern': '(?-m:^[a-z])(^[a-z])',
		'flags': 'm',
		'expected': '(?:^[a-z])((?:^|(?<=[\\n\\r\\u2028\\u2029]))[a-z])',
		'expectedFlags': '',
	},
	{
		'pattern': '(?-m:[a-z]$)([a-z]$)',
		'flags': 'm',
		'expected': '(?:[a-z]$)([a-z](?:$|(?=[\\n\\r\\u2028\\u2029])))',
		'expectedFlags': '',
	},
	{
		'pattern': '(^a|(?-m:^b))',
		'expected': '(^a|(?:^b))'
	},
	{
		'pattern': '(^a|(?-m:^b))',
		'flags': 'm',
		'expected': '((?:^|(?<=[\\n\\r\\u2028\\u2029]))a|(?:^b))',
		'expectedFlags': ''
	},
	// -s
	{
		'pattern': '(.(?-s:.))',
		'expected': '(.(?:.))'
	},
	{
		'pattern': '(.(?-s:.))',
		'flags': 's',
		'expected': '([^](?:.))',
		'expectedFlags': ''
	},
	// +ims
	{
		'pattern': '(?ims:^[a-z])',
		'flags': '',
		'expected': '(?:(?:^|(?<=[\\n\\r\\u2028\\u2029]))[A-Za-z])',
		'expectedFlags': '',
	},
	// -ims
	{
		'pattern': '(?-ims:^[a-z].)(^[a-z].)',
		'flags': 'ims',
		'expected': '(?:^[a-z].)((?:^|(?<=[\\n\\r\\u2028\\u2029]))[A-Za-z][^])',
		'expectedFlags': '',
	},
	{
		'pattern': '(?-ims:^[a-z].)(^[a-z].)',
		'expected': '(?:^[a-z].)(^[a-z].)',
		'expectedFlags': '',
	},
].filter(Boolean);

exports.modifiersFixtures = modifiersFixtures;
