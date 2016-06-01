'use strict';

const generate = require('regjsgen').generate;
const parse = require('regjsparser').parse;
const regenerate = require('regenerate');
const looseMatch = require('unicode-loose-match');
const knownUnicodeProperties = new Set(
	require('regenerate-unicode-properties')
);
const iuMappings = require('./data/iu-mappings.js');
const ESCAPE_SETS = require('./data/character-class-escape-sets.js');

const getCharacterClassEscapeSet = function(character) {
	if (config.unicode) {
		if (config.ignoreCase) {
			return ESCAPE_SETS.UNICODE_IGNORE_CASE.get(character);
		}
		return ESCAPE_SETS.UNICODE.get(character);
	}
	return ESCAPE_SETS.REGULAR.get(character);
};

const getUnicodePropertyValueSet = function(property, value) {
	const path = knownUnicodeProperties.has(property) ?
		`${ property }/${ value }` :
		`Binary_Property/${ property }`;
	try {
		return require(`regenerate-unicode-properties/${ path }.js`);
	} catch (exception) {
		throw new Error(
			`Failed to recognize value \`${ value }\` for property ` +
			`\`${ property }\`.`
		);
	}
};

const getUnicodePropertyEscapeSet = function(value, isNegative) {
	const parts = value.split('=');
	let canonical;
	if (parts.length == 1) {
		const firstPart = parts[0];
		// It could be a `General_Category` value or a binary property.
		canonical = looseMatch('General_Category', firstPart);
		if (!canonical.value) {
			// It’s not a `General_Category` value, so check if it’s a binary
			// property. Note: `looseMatch` throws on invalid properties.
			canonical = looseMatch(firstPart);
		}
	} else {
		// The pattern consists of two parts, i.e. `Property=Value`.
		canonical = looseMatch(parts[0], parts[1]);
	}
	const set = getUnicodePropertyValueSet(
		canonical.property,
		canonical.value
	).clone();
	if (isNegative) {
		return UNICODE_SET.clone().remove(set);
	}
	return set;
};

// Prepare a Regenerate set containing all code points, used for negative
// character classes (if any).
const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
// Without the `u` flag, the range stops at 0xFFFF.
// https://mths.be/es6#sec-pattern-semantics
const BMP_SET = regenerate().addRange(0x0, 0xFFFF);

// Prepare a Regenerate set containing all code points that are supposed to be
// matched by `/./u`. https://mths.be/es6#sec-atom
const DOT_SET_UNICODE = UNICODE_SET.clone() // all Unicode code points
	.remove(
		// minus `LineTerminator`s (https://mths.be/es6#sec-line-terminators):
		0x000A, // Line Feed <LF>
		0x000D, // Carriage Return <CR>
		0x2028, // Line Separator <LS>
		0x2029  // Paragraph Separator <PS>
	);
// Prepare a Regenerate set containing all code points that are supposed to be
// matched by `/./` (only BMP code points).
const DOT_SET = DOT_SET_UNICODE.clone()
	.intersection(BMP_SET);

// Add a range of code points + any case-folded code points in that range to a
// set.
regenerate.prototype.iuAddRange = function(min, max) {
	const $this = this;
	do {
		const folded = caseFold(min);
		if (folded) {
			$this.add(folded);
		}
	} while (++min <= max);
	return $this;
};

const update = function(item, pattern) {
	let tree = parse(pattern, config.useUnicodeFlag ? 'u' : '');
	switch (tree.type) {
		case 'characterClass':
		case 'group':
		case 'value':
			// No wrapping needed.
			break;
		default:
			// Wrap the pattern in a non-capturing group.
			tree = wrap(tree, pattern);
	}
	Object.assign(item, tree);
};

const wrap = function(tree, pattern) {
	// Wrap the pattern in a non-capturing group.
	return {
		'type': 'group',
		'behavior': 'ignore',
		'body': [tree],
		'raw': `(?:${ pattern })`
	};
};

const caseFold = function(codePoint) {
	return iuMappings.get(codePoint) || false;
};

const processCharacterClass = function(characterClassItem, regenerateOptions) {
	let set = regenerate();
	const body = characterClassItem.body.forEach(function(item) {
		switch (item.type) {
			case 'value':
				set.add(item.codePoint);
				if (config.ignoreCase && config.unicode) {
					const folded = caseFold(item.codePoint);
					if (folded) {
						set.add(folded);
					}
				}
				break;
			case 'characterClassRange':
				const min = item.min.codePoint;
				const max = item.max.codePoint;
				set.addRange(min, max);
				if (config.ignoreCase && config.unicode) {
					set.iuAddRange(min, max);
				}
				break;
			case 'characterClassEscape':
				set.add(getCharacterClassEscapeSet(item.value));
				break;
			case 'unicodePropertyEscape':
				set.add(getUnicodePropertyEscapeSet(item.value, item.negative));
				break;
			// The `default` clause is only here as a safeguard; it should never be
			// reached. Code coverage tools should ignore it.
			/* istanbul ignore next */
			default:
				throw new Error(`Unknown term type: ${ item.type }`);
		}
	});
	if (characterClassItem.negative) {
		set = (config.unicode ? UNICODE_SET : BMP_SET).clone().remove(set);
	}
	update(characterClassItem, set.toString(regenerateOptions));
	return characterClassItem;
};

const processTerm = function(item, regenerateOptions) {
	switch (item.type) {
		case 'dot':
			update(
				item,
				(config.unicode ? DOT_SET_UNICODE : DOT_SET)
					.toString(regenerateOptions)
			);
			break;
		case 'characterClass':
			item = processCharacterClass(item, regenerateOptions);
			break;
		case 'unicodePropertyEscape':
			update(
				item,
				getUnicodePropertyEscapeSet(item.value, item.negative)
					.toString(regenerateOptions)
			);
			break;
		case 'characterClassEscape':
			update(
				item,
				getCharacterClassEscapeSet(item.value).toString(regenerateOptions)
			);
			break;
		case 'alternative':
		case 'disjunction':
		case 'group':
		case 'quantifier':
			item.body = item.body.map(processTerm);
			break;
		case 'value':
			const codePoint = item.codePoint;
			const set = regenerate(codePoint);
			if (config.ignoreCase && config.unicode) {
				const folded = caseFold(codePoint);
				if (folded) {
					set.add(folded);
				}
			}
			update(item, set.toString(regenerateOptions));
			break;
		case 'anchor':
		case 'empty':
		case 'group':
		case 'reference':
			// Nothing to do here.
			break;
		// The `default` clause is only here as a safeguard; it should never be
		// reached. Code coverage tools should ignore it.
		/* istanbul ignore next */
		default:
			throw new Error(`Unknown term type: ${ item.type }`);
	}
	return item;
};

const config = {
	'ignoreCase': false,
	'unicode': false,
	'useUnicodeFlag': false
};
const rewritePattern = function(pattern, flags, options) {
	const regjsparserFeatures = {
		'unicodePropertyEscape': options && options.unicodePropertyEscape
	};
	config.useUnicodeFlag = options && options.useUnicodeFlag;
	const regenerateOptions = {
		'hasUnicodeFlag': config.useUnicodeFlag
	};
	const tree = parse(pattern, flags, regjsparserFeatures);
	config.ignoreCase = flags && flags.includes('i');
	config.unicode = flags && flags.includes('u');
	Object.assign(tree, processTerm(tree, regenerateOptions));
	return generate(tree);
};

module.exports = rewritePattern;
