const regenerate = require('regenerate');

const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
const UNICODE_PATTERN = UNICODE_SET.toString();

const dotAllFlagFixtures = [
	{
		'pattern': '.',
		'flags': 's',
		'expected': '[^]'
	},
	{
		'pattern': '.',
		'flags': 'gimsy',
		'expected': '[^]'
	},
	{
		'pattern': '.',
		'flags': 's',
		'expected': '[^]',
		options: { unicodeFlag: 'transform' }
	},
	{
		'pattern': '.',
		'flags': 'gimsy',
		'expected': '[^]',
		options: { unicodeFlag: 'transform' }
	},
	{
		'pattern': '.',
		'flags': 'su',
		'expected': UNICODE_PATTERN,
		options: { unicodeFlag: 'transform' }
	},
	{
		'pattern': '.',
		'flags': 'gimsuy',
		'expected': UNICODE_PATTERN,
		options: { unicodeFlag: 'transform' }
	}
];

exports.dotAllFlagFixtures = dotAllFlagFixtures;
