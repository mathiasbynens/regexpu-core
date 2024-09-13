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
		'pattern': '(?i:[a-z])',
		'flags': 'u',
		'options':  { unicodeFlag: 'transform', modifiers: 'transform' },
		'expected': '(?:[A-Za-z\\u017F\\u212A])',
		'expectedFlags': '',
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
];

exports.modifiersFixtures = modifiersFixtures;
