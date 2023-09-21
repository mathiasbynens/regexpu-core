const characterClassFixtures = [
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'iu',
		expected: '(?:(?![K\\u212A\\uD800-\\uDFFF])[\\s\\S]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'iu',
		expected: '(?:(?![k\\u212A\\uD800-\\uDFFF])[\\s\\S]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'iu',
		expected: '(?:(?![K\\u212A\\uD800-\\uDFFF])[\\s\\S]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF])',
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
		expected: '(?:(?![\\uD800-\\uDFFF])[\\s\\S]|[\\uD800-\\uD834\\uD836-\\uDBFF][\\uDC00-\\uDFFF]|\\uD835[\\uDC00-\\uDD0D\\uDD0F-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^K]', // LATIN CAPITAL LETTER K
		flags: 'u',
		expected: '(?:[\\0-JL-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^k]', // LATIN SMALL LETTER K
		flags: 'u',
		expected: '(?:[\\0-jl-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^\u212a]', // KELVIN SIGN
		flags: 'u',
		expected: '(?:[\\0-\\u2129\\u212B-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])',
		options: { unicodeFlag: 'transform' }
	},
	{
		pattern: '[^\u{1D50E}]', // MATHEMATICAL FRAKTUR CAPITAL K
		flags: 'u',
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
	}
];

exports.characterClassFixtures = characterClassFixtures;
