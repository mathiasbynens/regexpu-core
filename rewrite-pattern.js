'use strict';

const generate = require('regjsgen').generate;
const parse = require('regjsparser').parse;
const regenerate = require('regenerate');
const unicodeMatchProperty = require('unicode-match-property-ecmascript');
const unicodeMatchPropertyValue = require('unicode-match-property-value-ecmascript');
const iuMappings = require('./data/iu-mappings.js');
const ESCAPE_SETS = require('./data/character-class-escape-sets.js');

// Prepare a Regenerate set containing all code points, used for negative
// character classes (if any).
const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);

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

const getCharacterClassEscapeSet = (character, unicode, ignoreCase) => {
	if (unicode) {
		if (ignoreCase) {
			return ESCAPE_SETS.UNICODE_IGNORE_CASE.get(character);
		}
		return ESCAPE_SETS.UNICODE.get(character);
	}
	return ESCAPE_SETS.REGULAR.get(character);
};

const getUnicodeDotSet = (dotAll) => {
	return dotAll ? UNICODE_SET : DOT_SET_UNICODE;
};

const getUnicodePropertyValueSet = (property, value) => {
	const path = value ?
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

const handleLoneUnicodePropertyNameOrValue = (value) => {
	// It could be a `General_Category` value or a binary property.
	// Note: `unicodeMatchPropertyValue` throws on invalid values.
	try {
		const property = 'General_Category';
		const category = unicodeMatchPropertyValue(property, value);
		return getUnicodePropertyValueSet(property, category);
	} catch (exception) {}
	// It’s not a `General_Category` value, so check if it’s a binary
	// property. Note: `unicodeMatchProperty` throws on invalid properties.
	const property = unicodeMatchProperty(value);
	return getUnicodePropertyValueSet(property);
};

const getUnicodePropertyEscapeSet = (value, isNegative) => {
	const parts = value.split('=');
	const firstPart = parts[0];
	let set;
	if (parts.length == 1) {
		set = handleLoneUnicodePropertyNameOrValue(firstPart);
	} else {
		// The pattern consists of two parts, i.e. `Property=Value`.
		const property = unicodeMatchProperty(firstPart);
		const value = unicodeMatchPropertyValue(property, parts[1]);
		set = getUnicodePropertyValueSet(property, value);
	}
	if (isNegative) {
		return UNICODE_SET.clone().remove(set);
	}
	return set.clone();
};

// Given a range of code points, add any case-folded code points in that range
// to a set.
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
regenerate.prototype.iuRemoveRange = function(min, max) {
	const $this = this;
	do {
		const folded = caseFold(min);
		if (folded) {
			$this.remove(folded);
		}
	} while (++min <= max);
	return $this;
};

const update = (item, pattern) => {
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

const wrap = (tree, pattern) => {
	// Wrap the pattern in a non-capturing group.
	return {
		'type': 'group',
		'behavior': 'ignore',
		'body': [tree],
		'raw': `(?:${ pattern })`
	};
};

const caseFold = (codePoint) => {
	return iuMappings.get(codePoint) || false;
};

const buildHandler = (action) => {
	switch (action) {
		case 'union':
			return {
				single: (set, cp) => set ? set.add(cp) : regenerate(cp),
				regSet: (set, set2) => set ? set.add(set2) : set2,
				range: (set, start, end) => {
					if (!set) set = regenerate();
					set.addRange(start, end);
					return set;
				},
				iuRange: (set, start, end) => {
					if (!set) set = regenerate();
					set.iuAddRange(start, end);
					return set;
				}
			};
		case 'union-negative':
			return {
				single: (set, cp) => set && set.contains(cp) ? UNICODE_SET.clone() : UNICODE_SET.clone().remove(cp),
				regSet: (set, set2) => UNICODE_SET.clone().remove(set2).add(set || []),
				range: (set, start, end) => UNICODE_SET.clone().removeRange(start, end).add(set || []),
				iuRange: (set, start, end) => UNICODE_SET.clone().iuRemoveRange(start, end).add(set || [])
			};
		case 'intersection':
			const regSet = (set, set2) => set ? set.intersection(set2) : set2;
			return {
				single: (set, cp) => !set || set.contains(cp) ? regenerate(cp) : regenerate(),
				regSet: regSet,
				range: (set, start, end) => regSet(set, regenerate().addRange(start, end)),
				iuRange: (set, start, end) => regSet(set, regenerate().iuAddRange(start, end))
			};
		case 'subtraction':
			return {
				single: (set, cp) => set ? set.remove(cp) : regenerate(cp),
				regSet: (set, set2) => set ? set.remove(set2) : set2,
				range: (set, start, end) => set ? set.removeRange(start, end) : regenerate().addRange(start, end),
				iuRange: (set, start, end) => set ? set.iuRemoveRange(start, end) : regenerate().iuAddRange(start, end)
			};
		// The `default` clause is only here as a safeguard; it should never be
		// reached. Code coverage tools should ignore it.
		/* istanbul ignore next */
		default:
			throw new Error(`Unknown set action: ${ characterClassItem.kind }`);
	}
};

const computeCharacterClass = (characterClassItem) => {
	let transformed = config.transform.unicodeFlag;
	let set;

	let handlePositive;
	let handleNegative;

	switch (characterClassItem.kind) {
		case 'union':
			handlePositive = buildHandler('union');
			handleNegative = buildHandler('union-negative');
			break;
		case 'intersection':
			handlePositive = buildHandler('intersection');
			handleNegative = buildHandler('subtraction');
			break;
		case 'subtraction':
			handlePositive = buildHandler('subtraction');
			handleNegative = buildHandler('intersection');
			break;
		// The `default` clause is only here as a safeguard; it should never be
		// reached. Code coverage tools should ignore it.
		/* istanbul ignore next */
		default:
			throw new Error(`Unknown character class kind: ${ characterClassItem.kind }`);
	}

	for (const item of characterClassItem.body) {
		switch (item.type) {
			case 'value':
				set = handlePositive.single(set, item.codePoint);
				if (config.flags.ignoreCase && config.transform.unicodeFlag) {
					const folded = caseFold(item.codePoint);
					if (folded) {
						set = handlePositive.single(set, folded);
					}
				}
				break;
			case 'characterClassRange':
				const min = item.min.codePoint;
				const max = item.max.codePoint;
				set = handlePositive.range(set, min, max);
				if (config.flags.ignoreCase && config.transform.unicodeFlag) {
					set = handlePositive.iuRange(set, min, max);
				}
				break;
			case 'characterClassEscape':
				set = handlePositive.regSet(set, getCharacterClassEscapeSet(
					item.value,
					config.flags.unicode,
					config.flags.ignoreCase
				));
				break;
			case 'unicodePropertyEscape':
				set = handlePositive.regSet(set, getUnicodePropertyEscapeSet(item.value, item.negative));
				if (config.transform.unicodePropertyEscapes) {
					transformed = true;
				}
				break;
			case 'characterClass':
				const handler = item.negative ? handleNegative : handlePositive;
				const res = computeCharacterClass(item);
				set = handler.regSet(set, res.set);
				transformed = true;
				break;
			// The `default` clause is only here as a safeguard; it should never be
			// reached. Code coverage tools should ignore it.
			/* istanbul ignore next */
			default:
				throw new Error(`Unknown term type: ${ item.type }`);
		}
	}

	if (!set) { // /[]/
		set = regenerate();
	}

	return { set, transformed };
}

const processCharacterClass = (characterClassItem, regenerateOptions) => {
	const negative = characterClassItem.negative;
	const { set, transformed } = computeCharacterClass(characterClassItem);
	if (transformed) {
		const setStr = set.toString(regenerateOptions);
		if (negative) {
			if (config.useUnicodeFlag) {
				update(characterClassItem, `[^${setStr.slice(1, -1)}]`)
			} else {
				update(characterClassItem, `(?!${setStr})[\\s\\S]`)
			}
		} else {
			update(characterClassItem, setStr);
		}
	}
	return characterClassItem;
};

const updateNamedReference = (item, index) => {
	delete item.name;
	item.matchIndex = index;
};

const assertNoUnmatchedReferences = (groups) => {
	const unmatchedReferencesNames = Object.keys(groups.unmatchedReferences);
	if (unmatchedReferencesNames.length > 0) {
		throw new Error(`Unknown group names: ${unmatchedReferencesNames}`);
	}
};

const processTerm = (item, regenerateOptions, groups) => {
	switch (item.type) {
		case 'dot':
			if (config.transform.unicodeFlag) {
				update(
					item,
					getUnicodeDotSet(config.flags.dotAll).toString(regenerateOptions)
				);
			} else if (config.transform.dotAllFlag) {
				// TODO: consider changing this at the regenerate level.
				update(item, '[\\s\\S]');
			}
			break;
		case 'characterClass':
			item = processCharacterClass(item, regenerateOptions);
			break;
		case 'unicodePropertyEscape':
			if (config.transform.unicodePropertyEscapes) {
				update(
					item,
					getUnicodePropertyEscapeSet(item.value, item.negative)
						.toString(regenerateOptions)
				);
			}
			break;
		case 'characterClassEscape':
			if (config.transform.unicodeFlag) {
				update(
					item,
					getCharacterClassEscapeSet(
						item.value,
						/* config.transform.unicodeFlag implies config.flags.unicode */ true,
						config.flags.ignoreCase
					).toString(regenerateOptions)
				);
			}
			break;
		case 'group':
			if (item.behavior == 'normal') {
				groups.lastIndex++;
			}
			if (item.name && config.transform.namedGroups) {
				const name = item.name.value;

				if (groups.names[name]) {
					throw new Error(
						`Multiple groups with the same name (${ name }) are not allowed.`
					);
				}

				const index = groups.lastIndex;
				delete item.name;

				groups.names[name] = index;
				if (groups.onNamedGroup) {
					groups.onNamedGroup.call(null, name, index);
				}

				if (groups.unmatchedReferences[name]) {
					groups.unmatchedReferences[name].forEach(reference => {
						updateNamedReference(reference, index);
					});
					delete groups.unmatchedReferences[name];
				}
			}
			/* falls through */
		case 'alternative':
		case 'disjunction':
		case 'quantifier':
			item.body = item.body.map(term => {
				return processTerm(term, regenerateOptions, groups);
			});
			break;
		case 'value':
			const codePoint = item.codePoint;
			const set = regenerate(codePoint);
			if (config.flags.ignoreCase && config.transform.unicodeFlag) {
				const folded = caseFold(codePoint);
				if (folded) {
					set.add(folded);
				}
			}
			update(item, set.toString(regenerateOptions));
			break;
		case 'reference':
			if (item.name) {
				const name = item.name.value;
				const index = groups.names[name];
				if (index) {
					updateNamedReference(item, index);
					break;
				}

				if (!groups.unmatchedReferences[name]) {
					groups.unmatchedReferences[name] = [];
				}
				// Keep track of references used before the corresponding group.
				groups.unmatchedReferences[name].push(item);
			}
			break;
		case 'anchor':
		case 'empty':
		case 'group':
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
	'flags': {
		'ignoreCase': false,
		'unicode': false,
		'unicodeSets': false,
		'dotAll': false,
	},
	'transform': {
		'dotAllFlag': false,
		'unicodeFlag': false,
		'unicodeSetsFlag': false,
		'unicodePropertyEscapes': false,
		'namedGroups': false,
	},
	get useUnicodeFlag() {
		return (this.flags.unicode || this.flags.unicodeSets) && !this.transform.unicodeFlag;
	}
};

const validateOptions = (options) => {
	if (!options) return;

	for (const key of Object.keys(options)) {
		const value = options[key];
		switch (key) {
			case 'dotAllFlag':
			case 'unicodeFlag':
			case 'unicodePropertyEscapes':
			case 'namedGroups':
				if (value != null && value !== false && value !== 'transform') {
					throw new Error(`.${key} must be false (default) or 'transform'.`);
				}
				break;
			case 'unicodeSetsFlag':
				if (value != null && value !== false && value !== 'parse' && value !== 'transform') {
					throw new Error(`.${key} must be false (default), 'parse' or 'transform'.`);
				}
				break;
			case 'onNamedGroup':
				if (value != null && typeof value !== 'function') {
					throw new Error('.onNamedGroup must be a function.');
				}
				break;
			default:
				throw new Error(`.${key} is not a valid regexpu-core option.`);
		}
	}
};

const hasFlag = (flags, flag) => flags ? flags.includes(flag) : false;
const transform = (options, name) => options ? options[name] === 'transform' : false;

const rewritePattern = (pattern, flags, options) => {
	validateOptions(options);

	config.flags.unicode = hasFlag(flags, 'u');
	config.flags.unicodeSets = hasFlag(flags, 'v');
	config.flags.ignoreCase = hasFlag(flags, 'i');
	config.flags.dotAll = hasFlag(flags, 's');

	config.transform.dotAllFlag = config.flags.dotAll && transform(options, 'dotAllFlag');
	config.transform.unicodeFlag = (config.flags.unicode || config.flags.unicodeSets) && transform(options, 'unicodeFlag');
	config.transform.unicodeSetsFlag = config.flags.unicodeSets && transform(options, 'unicodeSetsFlag');

	// unicodeFlag: 'transform' implies unicodePropertyEscapes: 'transform'
	config.transform.unicodePropertyEscapes = config.flags.unicode && (
		transform(options, 'unicodeFlag') || transform(options, 'unicodePropertyEscapes')
	);
	config.transform.namedGroups = transform(options, 'namedGroups');

	const regjsparserFeatures = {
		'unicodeSet': Boolean(options && options.unicodeSetsFlag),

		// Enable every stable RegExp feature by default
		'unicodePropertyEscape': true,
		'namedGroups': true,
		'lookbehind': true,
	};

	const regenerateOptions = {
		'hasUnicodeFlag': config.useUnicodeFlag,
		'bmpOnly': !config.flags.unicode
	};

	const groups = {
		'onNamedGroup': options && options.onNamedGroup,
		'lastIndex': 0,
		'names': Object.create(null), // { [name]: index }
		'unmatchedReferences': Object.create(null) // { [name]: Array<reference> }
	};

	const tree = parse(pattern, flags, regjsparserFeatures);
	// Note: `processTerm` mutates `tree` and `groups`.
	processTerm(tree, regenerateOptions, groups);
	assertNoUnmatchedReferences(groups);
	return generate(tree);
};

module.exports = rewritePattern;
