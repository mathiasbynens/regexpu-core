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
		'expected': '(?:)(?:)()\\1'
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
	},
	{
		'pattern': '(?:(?<a>x)|(?<a>y))\\k<a>',
		'flags': '',
		'expected': '(?:(x)|(y))\\1\\2',
		'expectedGroups': [
			['a', 1],
			['a', 2]
		]
	},
	{
		'pattern': '(?:(?<a>x)\\k<a>|(?<a>y)\\k<a>)',
		'flags': '',
		'expected': '(?:(x)\\1|(y)\\1\\2)',
		'expectedGroups': [
			['a', 1],
			['a', 2]
		]
	}
];

exports.namedGroupFixtures = namedGroupFixtures;
