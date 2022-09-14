'use strict';

const fs = require('fs');
const jsesc = require('jsesc');
const regenerate = require('regenerate');

const Zs = require('@unicode/unicode-15.0.0/General_Category/Space_Separator/code-points.js');

const iuMappings = require('../data/iu-mappings.js');

const caseFold = (codePoint) => {
	return iuMappings.get(codePoint) || false;
};

// Prepare a Regenerate set containing all code points, used for negative
// character classes (if any).
const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
// Without the `u` flag, the range stops at 0xFFFF.
// https://mths.be/es#sec-pattern-semantics
const BMP_SET = regenerate().addRange(0x0, 0xFFFF);

const ESCAPE_CHARS = {};
const ESCAPE_CHARS_UNICODE = {};
const ESCAPE_CHARS_UNICODE_IGNORE_CASE = {};
const addCharacterClassEscape = (lower, set) => {
	ESCAPE_CHARS[lower] = ESCAPE_CHARS_UNICODE[lower] = set;
	const upper = lower.toUpperCase();
	ESCAPE_CHARS[upper] = BMP_SET.clone().remove(set);
	ESCAPE_CHARS_UNICODE[upper] = UNICODE_SET.clone().remove(set);
	// Check if one or more symbols in this set fold to another one. If so,
	// a copy of the set including the mapped symbols is created for use with
	// regular expressions that have both the `u` and `i` flags set.
	const codePoints = set.toArray();
	const iuSet = regenerate();
	let containsFoldingSymbols = false;
	for (const codePoint of codePoints) {
		let folded = caseFold(codePoint);
		if (folded) {
			containsFoldingSymbols = true;
			iuSet.add(folded);
			folded = caseFold(folded);
			if (folded) {
				iuSet.add(folded);
			}
		}
	}
	const iuLowerSet = containsFoldingSymbols ?
		iuSet.clone().add(set) :
		set;
	const iuUpperSet = UNICODE_SET.clone().remove(iuLowerSet);
	ESCAPE_CHARS_UNICODE_IGNORE_CASE[lower] = iuLowerSet;
	ESCAPE_CHARS_UNICODE_IGNORE_CASE[upper] = iuUpperSet;
}

// Prepare a Regenerate set for every existing character class escape.
// https://mths.be/es#sec-characterclassescape
addCharacterClassEscape(
	'd', // `\d` and `\D`
	regenerate().addRange('0', '9')
);
addCharacterClassEscape(
	's', // `\s` and `\S`
	regenerate(
		// https://mths.be/es#sec-white-space
		0x0009,
		0x000B,
		0x000C,
		0x0020,
		0x00A0,
		0xFEFF,
		Zs,
		// https://mths.be/es#sec-line-terminators
		0x000A,
		0x000D,
		0x2028,
		0x2029
	)
);
addCharacterClassEscape(
	'w', // `\w` and `\W`
	regenerate('_').addRange('a', 'z').addRange('A', 'Z').addRange('0', '9')
);

/*----------------------------------------------------------------------------*/

const codePointToString = (codePoint) => {
	return '0x' + codePoint.toString(16).toUpperCase();
};

// Regenerate plugin that turns a set into some JavaScript source code that
// generates that set.
regenerate.prototype.toCode = function() {
	const data = this.data;
	// Iterate over the data per `(start, end)` pair.
	let index = 0;
	let start;
	let end;
	const length = data.length;
	const loneCodePoints = [];
	const ranges = [];
	while (index < length) {
		start = data[index];
		end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
		if (start == end) {
			loneCodePoints.push(codePointToString(start));
		} else {
			ranges.push(
				'addRange(' + codePointToString(start) +
				', ' + codePointToString(end) + ')'
			);
		}
		index += 2;
	}
	return 'regenerate(' + loneCodePoints.join(', ') + ')' +
		(ranges.length ? '\n\t\t.' + ranges.join('\n\t\t.') : '');
};

const stringify = (name, object) => {
	const source = 'exports.' + name + ' = new Map([\n\t' + Object.keys(object).map((character) => {
		const set = object[character];
		return '[' + jsesc(character, { 'wrap': true }) + ', ' + set.toCode() + ']';
	}).join(',\n\t') + '\n]);';
	return source;
};

const source = [
	'// Generated using `npm run build`. Do not edit.\n' +
	`'use strict';\n\nconst regenerate = require('regenerate');`,
	stringify('REGULAR', ESCAPE_CHARS),
	stringify('UNICODE', ESCAPE_CHARS_UNICODE),
	stringify('UNICODE_IGNORE_CASE', ESCAPE_CHARS_UNICODE_IGNORE_CASE)
].join('\n\n');

// Save the precompiled sets to a static file.
fs.writeFileSync('data/character-class-escape-sets.js', source + '\n');
