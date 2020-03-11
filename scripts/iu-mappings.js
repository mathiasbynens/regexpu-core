'use strict';

const fs = require('fs');
const _ = require('lodash');
const jsesc = require('jsesc');

const hex = (number) => {
	return `0x${ number.toString(16).toUpperCase() }`;
};

const writeMap = (fileName, map) => {
	// Sort map by key.
	const sortedMap = new Map([...map].sort((a, b) => a[0] - b[0]));
	fs.writeFileSync(
		fileName,
		`module.exports = ${ jsesc(sortedMap, {
			'compact': false,
			'numbers': 'hexadecimal'
		}) };\n`
	);
}

// Given two code points, check if both are in the ASCII range and if one is
// the uppercased version of the other. In that case, ES5 engines know about
// this mapping, so it’s only needed to include one of the two in a
// case-insensitive regular expression.
const isES5CasedVariant = (a, b) => {
	return (a < 0x80 && b < 0x80) &&
		(oneWayMappings.get(a) == b || oneWayMappings.get(b) == a);
};

const extend = (map, key, value, callback) => {
	if (map.has(key)) {
		const currentValue = map.get(key);
		if (Array.isArray(currentValue)) {
			if (currentValue.indexOf(value) > -1) {
				return;
			}
			if (callback) {
				const skip = currentValue.some((codePoint) => {
					return callback(codePoint, value);
				});
				if (skip) {
					return;
				}
			}
			currentValue.push(value);
		} else {
			if (currentValue == value) {
				return;
			}
			if (callback) {
				if (callback(currentValue, value)) {
					return;
				}
			}
			map.set(key, [currentValue, value]);
		}
	} else {
		map.set(key, value);
	}
};

// From <http://unicode.org/Public/UCD/latest/ucd/CaseFolding.txt>:
//
// The status field is:
// C: common case folding, common mappings shared by both simple and full
//    mappings.
// F: full case folding, mappings that cause strings to grow in length. Multiple
//    characters are separated by spaces.
// S: simple case folding, mappings to single characters where different from F.
// T: special case for uppercase I and dotted uppercase I
//    - For non-Turkic languages, this mapping is normally not used.
//    - For Turkic languages (tr, az), this mapping can be used instead of the
//      normal mapping for these characters. Note that the Turkic mappings do
//      not maintain canonical equivalence without additional processing.
//      See the discussions of case mapping in the Unicode Standard for more
//      information.
//
// Usage:
//  A. To do a simple case folding, use the mappings with status C + S.
//  B. To do a full case folding, use the mappings with status C + F.

const commonMappings = require('unicode-13.0.0/Case_Folding/C/code-points.js');
const simpleMappings = require('unicode-13.0.0/Case_Folding/S/code-points.js');

// We want the `C` mappings in both directions (i.e. `A` should fold to `a`
// and `a` to `A`), and the `S` mappings in both directions (i.e. `ẞ` should
// fold to `ß` and `ß` to `ẞ`). Let’s start with the simple case folding (in
// one direction) first, then filter the set, and then deal with the inverse.
const oneWayMappings = new Map();
for (const [from, to] of commonMappings) {
	oneWayMappings.set(from, to);
}
for (const [from, to] of simpleMappings) {
	oneWayMappings.set(from, to);
}
// Note: various code points can fold into the same code point, so it’s not
// possible to simply invert `oneWayMappings` — some entries would be lost in
// the process.

// In case-insignificant matches when `Unicode` is `true` (i.e. when the `u`
// flag is enabled), all characters are implicitly case-folded using the
// simple mapping provided by the Unicode standard immediately before they
// are compared. The simple mapping always maps to a single code point, so it
// does not map, for example, `ß` (U+00DF) to `SS`. It may however map a code
// point outside the Basic Latin range to a character within, for example, `ſ`
// (U+017F) to `s`. Such characters are not mapped if `Unicode` is `false`.
// This prevents Unicode code points such as U+017F and U+212A from matching
// regular expressions such as `/[a‑z]/i`, but they will match `/[a‑z]/ui`.
// https://mths.be/es6#sec-runtime-semantics-canonicalize-abstract-operation
// Get the mappings that are unique to regular expressions that have both the
// `i` and `u` flags set. In addition to the above, this includes all mappings
// for astral code points.
const filteredMappings = new Map();
for (const [from, to] of oneWayMappings) {
	// Case folding is applied to both the pattern and the string being matched.
	// Because of that e.g. `/[A-Z]/iu` matches U+017F and U+212A, just like
	// `/[a-z]/iu` would, even though no symbol in the range from `A` to `Z`
	// folds to U+017F or U+212A directly. Since we’re only transpiling regular
	// expressions and not strings, we have to account for this in regular
	// expressions only. This can be done as per this example:
	// 1. `oneWayMappings` already maps `S` to `s`. (83 → 115)
	// 2. `oneWayMappings` already maps `ſ` to `s`. (383 → 115)
	// 3. So, in the generated mappings, make sure `S` maps to `ſ`. (83 → 383)
	// Check if there are any other code points that map to the same `to` value.
	for (const [otherFrom, otherTo] of oneWayMappings) {
		if (otherFrom != from && otherTo == to) {
			// Note: we could use `extend` here, but it’s not necessary as there can
			// only be a single value for the key `from` at this point.
			filteredMappings.set(from, otherFrom);
		}
	}
	if (
		// Include astral code points.
		(from > 0xFFFF || to > 0xFFFF) ||
		// Exclude ES5 mappings as per the above comment.
		// https://mths.be/es6#sec-runtime-semantics-canonicalize-abstract-operation
		(
			// TODO: Make this not depend on the engine in which this build script
			// runs. (If V8 has a bug, then the generated data has the same bug.)
			!RegExp(String.fromCodePoint(from), 'i').test(String.fromCodePoint(to))
		)
	) {
		extend(filteredMappings, from, to);
	} else {
		const stringFrom = String.fromCodePoint(from);
		const stringTo = String.fromCodePoint(to);
		const code = `/${
			jsesc(stringFrom)
		}/i.test(${
			jsesc(stringTo, { 'wrap': true })
		})`;
		console.log(
			`Skipping ${ hex(from) } → ${ hex(to) } since ${ code } is already \`true\`.`
		);
		// The following snippet was used to create https://mths.be/demo/regex-i.
		// https://github.com/mathiasbynens/regexpu-core/issues/7#issuecomment-225894534
		// console.log(
		// 	`console.assert(${ code }, ${ JSON.stringify(code) });`
		// );
	}
}

// Create a new object containing all `filteredMappings` and their inverse.
const iuMappings = new Map();
for (const [from, to] of filteredMappings) {
	if (Array.isArray(to)) {
		for (const codePoint of to) {
			extend(iuMappings, from, codePoint, isES5CasedVariant);
			extend(iuMappings, codePoint, from, isES5CasedVariant);
		}
	} else {
		extend(iuMappings, from, to, isES5CasedVariant);
		extend(iuMappings, to, from, isES5CasedVariant);
	}
}

writeMap('data/iu-mappings.js', iuMappings);
