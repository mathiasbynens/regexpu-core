'use strict';

const fs = require('fs');
const jsesc = require('jsesc');
const regenerate = require('regenerate');
require('./utils/regenerate-plugin-to-code.js');

const Zs = require('@unicode/unicode-16.0.0/General_Category/Space_Separator/code-points.js');

const iuMappings = require('../data/iu-mappings.js');
const iuFoldings = require('../data/iu-foldings.js');
const { UNICODE_SET, UNICODE_IV_SET } = require('../data/all-characters.js');

const simpleCaseFolding = (codePoint) => {
	return iuFoldings.get(codePoint) || codePoint;
}

const getCaseEquivalents = (codePoint) => {
	return iuMappings.get(codePoint) || false;
};

// Without the `u` flag, the range stops at 0xFFFF.
// https://mths.be/es#sec-pattern-semantics
const BMP_SET = regenerate().addRange(0x0, 0xFFFF);

const ESCAPE_CHARS = {};
const ESCAPE_CHARS_UNICODE = {};
const ESCAPE_CHARS_UNICODE_IGNORE_CASE = {};
const ESCAPE_CHARS_UNICODESET_IGNORE_CASE = {};
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
	let containsSimpleCaseFolding = false;
	for (const codePoint of codePoints) {
		let caseEquivalents = getCaseEquivalents(codePoint);
		if (caseEquivalents) {
			containsSimpleCaseFolding = true;
			iuSet.add(caseEquivalents);
			caseEquivalents = getCaseEquivalents(caseEquivalents);
			if (caseEquivalents) {
				iuSet.add(caseEquivalents);
			}
		}
	}
	const iuLowerSet = containsSimpleCaseFolding ?
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

ESCAPE_CHARS_UNICODESET_IGNORE_CASE['w'] = regenerate(
	ESCAPE_CHARS_UNICODE_IGNORE_CASE['w'].toArray().map(ch => simpleCaseFolding(ch))
);
ESCAPE_CHARS_UNICODESET_IGNORE_CASE['W'] = UNICODE_IV_SET.clone().remove(ESCAPE_CHARS_UNICODESET_IGNORE_CASE['w']);

/*----------------------------------------------------------------------------*/

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
	stringify('UNICODE_IGNORE_CASE', ESCAPE_CHARS_UNICODE_IGNORE_CASE),
	stringify('UNICODESET_IGNORE_CASE', ESCAPE_CHARS_UNICODESET_IGNORE_CASE)
].join('\n\n');

// Save the precompiled sets to a static file.
fs.writeFileSync('data/character-class-escape-sets.js', source + '\n');
