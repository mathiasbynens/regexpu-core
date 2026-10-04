const characterClassFixtures = [
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'iu',
		expected: '(?:(?![K\\u212A\\uD800-\\uDFFF])[^]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'iu',
		expected: '(?:(?![k\\u212A\\uD800-\\uDFFF])[^]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'iu',
		expected: '(?:(?![K\\u212A\\uD800-\\uDFFF])[^]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'iu',
		expected: '[^K]',
		options: {}
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'iu',
		expected: '[^k]',
		options: {}
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'iu',
		expected: '[^\u212a]',
		options: {}
	},
	{
		pattern: '[^\u{1D50E}]', // MATHEMATICAL FRAKTUR CAPITAL K
		flags: 'iu',
		expected: '(?:(?![\\uD800-\\uDFFF])[^]|[\\uD800-\\uD834\\uD836-\\uDBFF][\\uDC00-\\uDFFF]|\\uD835[\\uDC00-\\uDD0D\\uDD0F-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'u',
		matches: ["k", "\u212a", "\u{12345}", "\uDAAA", "\uDDDD"],
		nonMatches: ["K"],
		expected: '(?:[\\0-JL-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'u',
		matches: ["K", "\u212a", "\u{12345}", "\uDAAA", "\uDDDD"],
		nonMatches: ["k"],
		expected: '(?:[\\0-jl-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'u',
		matches: ["K", "k", "\u{12345}", "\uDAAA", "\uDDDD"],
		nonMatches: ["\u212a"],
		expected: '(?:[\\0-\\u2129\\u212B-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^\u{1D50E}]', // MATHEMATICAL FRAKTUR CAPITAL K
		flags: 'u',
		matches: ["K", "k", "\u{12345}", "\u{1D50F}", "\uDAAA", "\uDDDD"],
		nonMatches: ["\u{1D50E}"],
		expected: '(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uD834\\uD836-\\uDBFF][\\uDC00-\\uDFFF]|\\uD835[\\uDC00-\\uDD0D\\uDD0F-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'u',
		expected: '[^K]',
		options: {}
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'u',
		expected: '[^k]',
		options: {}
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'u',
		expected: '[^\u212a]',
		options: {}
	},
	{
		pattern: '[^\u{1D50E}]', // MATHEMATICAL FRAKTUR CAPITAL K
		flags: 'u',
		expected: '[^\u{1D50E}]',
		options: {}
	},
	{
		pattern: '^[^❤️]',
		flags: 'u',
		options: { unicodeFlag: 'transform' },
		expected: '^(?:[\\0-\\u2763\\u2765-\\uD7FF\\uE000-\\uFE0E\\uFE10-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		nonMatches: ['❤️']
	},
	{
		pattern: '^[^🧡]',
		flags: 'u',
		options: { unicodeFlag: 'transform' },
		expected: '^(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uD83D\\uD83F-\\uDBFF][\\uDC00-\\uDFFF]|\\uD83E[\\uDC00-\\uDDE0\\uDDE2-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		nonMatches: ['🧡']
	},
	{
		pattern: '[^💛]',
		flags: 'u',
		options: { unicodeFlag: 'transform' },
		expected: '(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uD83C\\uD83E-\\uDBFF][\\uDC00-\\uDFFF]|\\uD83D[\\uDC00-\\uDC9A\\uDC9C-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		nonMatches: ['💛']
	},
	{
		pattern: '[^💚]',
		flags: 'u',
		options: { unicodeFlag: 'transform' },
		expected: '(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uD83C\\uD83E-\\uDBFF][\\uDC00-\\uDFFF]|\\uD83D[\\uDC00-\\uDC99\\uDC9B-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		nonMatches: ['💚']
	},
	// https://github.com/mathiasbynens/regexpu-core/issues/112
	{
		pattern: '[\\uD800\\u{10000}]',
		flags: 'u',
		options: { unicodeFlag: 'transform' },
		expected: '(?:\\uD800\\uDC00|\\uD800(?![\\uDC00-\\uDFFF]))',
		matches: ['\uD800', '\u{10000}'],
		nonMatches: ['\u{10001}']
	},
	// https://github.com/mathiasbynens/regenerate/pull/48
	{
		pattern: '[b-da-c]',
		flags: 'u',
		options: { unicodeFlag: 'transform' },
		expected: '[a-d]',
		matches: ['a', 'b', 'c', 'd'],
		nonMatches: ['f', 'g']
	},
	{
		pattern: '[\\u{1F604}-\\u{1F608}\\u{1F600}-\\u{1F606}]',
		flags: 'u',
		options: { unicodeFlag: 'transform' },
		expected: '\\uD83D[\\uDE00-\\uDE08]',
		matches: ['\u{1F600}', '\u{1F608}'],
		nonMatches: ['\u{1F5FF}', '\u{1F609}']
	},
	{
		pattern: '[^\\u{1F604}-\\u{1F608}\\u{1F600}-\\u{1F606}]',
		flags: 'iu',
		options: { unicodeFlag: 'transform' },
		expected: '(?:(?![\\uD800-\\uDFFF])[^]|[\\uD800-\\uD83C\\uD83E-\\uDBFF][\\uDC00-\\uDFFF]|\\uD83D[\\uDC00-\\uDDFF\\uDE09-\\uDFFF])',
		matches: ['\u{1F5FF}', '\u{1F609}'],
		nonMatches: ['\u{1F600}', '\u{1F603}', '\u{1F608}']
	}
];

exports.characterClassFixtures = characterClassFixtures;
