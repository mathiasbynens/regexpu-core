'use strict';
const describe = global.describe || require("node:test").describe;
const it = global.it || require("node:test").it;
const assert = require('assert');
const regenerate = require('regenerate');
const rewritePattern = require('../rewrite-pattern.js');

const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);

const IS_NODE_6 = process.version.startsWith('v6.');

const { unicodeFixtures } = require("./fixtures/unicode.js");
const { unicodePropertyEscapeFixtures } = require("./fixtures/unicode-property-escape.js");
const { dotAllFlagFixtures } = require("./fixtures/dot-all-flag.js");
const { namedGroupFixtures } = require("./fixtures/named-group.js");
const { characterClassFixtures } = require("./fixtures/character-class.js");
const { unicodeSetFixtures } = require("./fixtures/unicode-set.js");
const { modifiersFixtures } = require("./fixtures/modifiers.js");

/** For node 6 compat */
assert.match || (assert.match = function match(value, regex) { assert.ok(regex.exec(value) !== null) });
assert.doesNotMatch || (assert.doesNotMatch = function doesNotMatch(value, regex) { assert.ok(regex.exec(value) === null) });

/**
 * comput output regex flags from input flags and transform options
 *
 * @param {string} inputFlags
 * @param {*} regexpuOptions
 */
function getOutputFlags(inputFlags, options) {
	let result = inputFlags;
	if (options.unicodeSetsFlag === "transform") {
		result = result.replace("v", "u");
	}
	if (options.unicodeFlag === "transform") {
		result = result.replace("u", "");
	}
	if (options.dotAllFlag === "transform") {
		result = result.replace("s", "");
	}
	return result;
}

describe('rewritePattern { unicodeFlag }', () => {
	const options = {
		'unicodeFlag': 'transform'
	};
	for (const fixture of unicodeFixtures) {
		const pattern = fixture.pattern;
		for (const flag of fixture.flags) {
			if (flag.includes('u')) {
				it('rewrites `/' + pattern + '/' + flag + '` correctly', () => {
					assert.equal(rewritePattern(pattern, flag, options), fixture.transpiled);
				});
			} else {
				it('leaves `/' + pattern + '/' + flag + '` as-is', () => {
					assert.equal(rewritePattern(pattern, flag, options), pattern);
				});
			}
		}
	}
});

const getPropertyValuePattern = (path) => {
	const codePoints = require(`@unicode/unicode-16.0.0/${
		path }/code-points.js`);
	return {
		'p': regenerate(codePoints).toString(),
		'P': UNICODE_SET.clone().remove(codePoints).toString()
	};
};

describe('unicodePropertyEscapes', () => {
	if (IS_NODE_6) return;

	const features = {
		'unicodePropertyEscapes': 'transform',
		'unicodeFlag': 'transform'
	};
	for (const fixture of unicodePropertyEscapeFixtures) {
		const expected = getPropertyValuePattern(fixture.path);
		for (const pattern of fixture.expressions) {
			const p = `\\p{${ pattern }}`;
			it('rewrites `/' + p + '/u` correctly', () => {
				const transpiled = rewritePattern(p, 'u', features);
				if (transpiled != '(?:' + expected.p + ')') {
					assert.equal(transpiled, expected.p);
				}
			});
			const P = `\\P{${ pattern }}`;
			it('rewrites `/' + P + '/u` correctly', () => {
				const transpiled = rewritePattern(P, 'u', features);
				if (transpiled != '(?:' + expected.P + ')') {
					assert.equal(transpiled, expected.P);
				}
			});
		}
	}
	it('transpiles Unicode property escapes within various constructions', () => {
		assert.equal(
			rewritePattern('\\p{ASCII_Hex_Digit}', 'u', features),
			'[0-9A-Fa-f]'
		);
		assert.equal(
			rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', features),
			'(?:\\uD811[\\uDC00-\\uDE46])'
		);
		assert.equal(
			rewritePattern('\\p{ASCII_Hex_Digit}+', 'u', features),
			'[0-9A-Fa-f]+'
		);
		assert.equal(
			rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}+', 'u', features),
			'(?:\\uD811[\\uDC00-\\uDE46])+'
		);
		assert.equal(
			rewritePattern('[\\p{ASCII_Hex_Digit}_]', 'u', features),
			'[0-9A-F_a-f]'
		);
		assert.equal(
			rewritePattern('[^\\p{ASCII_Hex_Digit}_]', 'u', features),
			'(?:[\\0-\\/:-@G-\\^`g-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])'
		);
		assert.equal(
			rewritePattern('[\\P{Script_Extensions=Anatolian_Hieroglyphs}]', 'u', features),
			'(?:[\\0-\\uFFFF]|[\\uD800-\\uD810\\uD812-\\uDBFF][\\uDC00-\\uDFFF]|\\uD811[\\uDE47-\\uDFFF])'
		);
		assert.equal(
			rewritePattern('[\\p{Script_Extensions=Anatolian_Hieroglyphs}_]', 'u', features),
			'(?:_|\\uD811[\\uDC00-\\uDE46])'
		);
		assert.equal(
			rewritePattern('[\\P{Script_Extensions=Anatolian_Hieroglyphs}_]', 'u', features),
			'(?:[\\0-\\uFFFF]|[\\uD800-\\uD810\\uD812-\\uDBFF][\\uDC00-\\uDFFF]|\\uD811[\\uDE47-\\uDFFF])'
		);
		assert.equal(
			rewritePattern('(?:\\p{ASCII_Hex_Digit})', 'u', features),
			'(?:[0-9A-Fa-f])'
		);
		assert.equal(
			rewritePattern('(?:\\p{Script_Extensions=Anatolian_Hieroglyphs})', 'u', features),
			'(?:(?:\\uD811[\\uDC00-\\uDE46]))'
		);
		assert.equal(
			rewritePattern('(?:\\p{Script_Extensions=Wancho})', 'u', features),
			'(?:(?:\\uD838[\\uDEC0-\\uDEF9\\uDEFF]))'
		);
	});
	it('throws on unknown binary properties', () => {
		assert.throws(() => {
			rewritePattern('\\p{UnknownBinaryProperty}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{UnknownBinaryProperty}', 'u', features);
		}, Error);
	});
	it('throws on explicitly unsupported properties', () => {
		// https://github.com/tc39/proposal-regexp-unicode-property-escapes/issues/27
		assert.throws(() => {
			rewritePattern('\\P{Composition_Exclusion}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Expands_On_NFC}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Expands_On_NFD}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Expands_On_NFKC}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Expands_On_NFKD}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{FC_NFKC_Closure}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\p{Full_Composition_Exclusion}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Grapheme_Link}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Hyphen}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Alphabetic}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Default_Ignorable_Code_Point}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Grapheme_Extend}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_ID_Continue}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_ID_Start}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Lowercase}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Math}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Other_Uppercase}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{Prepended_Concatenation_Mark}', 'u', features);
		}, Error);
	});
	it('throws on non-binary properties without a value', () => {
		assert.throws(() => {
			rewritePattern('\\p{General_Category}', 'u', features);
		}, Error);
	});
	it('throws on unknown property values', () => {
		assert.throws(() => {
			rewritePattern('\\p{General_Category=UnknownCategory}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{General_Category=UnknownCategory}', 'u', features);
		}, Error);
	});
	it('throws when loose matching is attempted', () => {
		assert.throws(() => {
			rewritePattern('\\p{gc=uppercaseletter}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\p{Block=Superscripts and Subscripts}', 'u', features);
		}, Error);
		assert.throws(() => {
			rewritePattern('\\P{_-_lOwEr_C-A_S-E_-_}', 'u', features);
		}, Error);
	});
	it('simplifies the output using Unicode code point escapes when not transforming the u flag', () => {
		assert.equal(
			rewritePattern('\\p{Script_Extensions=Anatolian_Hieroglyphs}', 'u', {
				'unicodePropertyEscapes': 'transform',
			}),
			'[\\u{14400}-\\u{14646}]'
		);
		assert.equal(
			rewritePattern('[\\P{Script_Extensions=Anatolian_Hieroglyphs}]', 'u', {
				'unicodePropertyEscapes': 'transform',
			}),
			'[\\0-\\u{143FF}\\u{14647}-\\u{10FFFF}]'
		);
	});
	it('should not transpile unicode property when unicodePropertyEscapes is not enabled', () => {
		assert.equal(
			rewritePattern('\\p{ASCII_Hex_Digit}\\P{ASCII_Hex_Digit}', 'u'),
			'\\p{ASCII_Hex_Digit}\\P{ASCII_Hex_Digit}'
		);
	});
	it('should transpile to minimal case-insensitive set', () => {
		assert.equal(
			rewritePattern('\u03B8', 'iu', {
				'unicodeFlag': 'transform'
			}),
			'[\\u03B8\\u03F4]'
		);
		assert.equal(
			rewritePattern('\u03B8', 'iu'),
			'\\u03B8'
		);
	});
	it('should not replace `-` symbol when not in character class range', () => {
		assert.equal(
			rewritePattern('-'),
			'-'
		)
	})
});

describe('dotAllFlag', () => {
	for (const fixture of dotAllFlagFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags;
		const options = Object.assign({
			'dotAllFlag': 'transform'
		}, fixture.options);
		it('rewrites `/' + pattern + '/' + flags + '` correctly', () => {
			const transpiled = rewritePattern(pattern, flags, options);
			const expected = fixture.expected;
			if (transpiled != '(?:' + expected + ')') {
				assert.strictEqual(transpiled, expected);
			}
		});
	}

	it('leaves `/./su` as-is', () => {
		assert.equal(rewritePattern('.', 'su'), '.');
	});
});

describe('namedGroups', () => {
	for (const fixture of namedGroupFixtures) {
		const {
			pattern,
			flags,
			expected,
			expectedGroups,
			options = {}
		} = fixture;
		const groups = [];

		Object.assign(options, {
			namedGroups: 'transform',
			'onNamedGroup': (name, index) => {
				groups.push([ name, index ]);
			}
		});

		it('rewrites `/' + pattern + '/' + flags + '` correctly', () => {
			const transpiled = rewritePattern(pattern, flags, options);
			assert.strictEqual(transpiled, expected);
			if (expectedGroups) {
				assert.deepStrictEqual(groups, expectedGroups);
			}
		});
	}

	it('onNamedGroup is optional', () => {
		let transpiled;
		const expected = '()';
		assert.doesNotThrow(() => {
			transpiled = rewritePattern('(?<name>)', '', {
				namedGroups: 'transform'
			});
		});
		assert.strictEqual(transpiled, expected);
	});

	it('multiple groups with the same name in the same disjunction are disallowed', () => {
		assert.throws(() => {
			rewritePattern('(?<name>)(?<name>)', '', {
				namedGroups: 'transform'
			});
		});

		assert.throws(() => {
			rewritePattern('(?<name>)(?:a|(?<name>))', '', {
				namedGroups: 'transform'
			});
		});

		assert.throws(() => {
			rewritePattern('(?:b|(?<name>))(?:a|(?<name>))', '', {
				namedGroups: 'transform'
			});
		});
	});

	it('multiple groups with the same name in the different disjunctions are allowed', () => {
		assert.doesNotThrow(() => {
			rewritePattern('(?<name>)|(?<name>)', '', {
				namedGroups: 'transform'
			});
		});

		assert.doesNotThrow(() => {
			rewritePattern('(?:b|(?<name>))|(?:a|(?<name>))', '', {
				namedGroups: 'transform'
			});
		});
	});

	it('named references must reference a group', () => {
		assert.throws(() => {
			rewritePattern('\\k<name>', '', {
				namedGroups: 'transform'
			});
		});
	});

	it('should not transpile when namedGroups is not enabled', () => {
		const pattern = '(?<name>)';
		let transpiled;
		assert.doesNotThrow(() => {
			transpiled = rewritePattern(pattern, '');
		});
		assert.strictEqual(pattern, transpiled);
	});

	it('should support named group references when namedGroups is not enabled', () => {
		const pattern = '(?<name>)\\k<name>';
		let transpiled;
		assert.doesNotThrow(() => {
			transpiled = rewritePattern(pattern, '');
		});
		assert.strictEqual(pattern, transpiled);
	});

	it('should validate named group references when namedGroups is not enabled', () => {
		assert.throws(() => rewritePattern('\\k<foo>', ''), /Unknown group names: foo/);
	});

	it('should call onNamedGroup even if namedGroups is not enabled', () => {
		let called = false;
		rewritePattern('(?<name>)', '', {
			onNamedGroup() {
				called = true;
			},
		});
		assert.strictEqual(called, true);
	})
});

describe('character classes', () => {
	for (const fixture of characterClassFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags;
		const options = fixture.options;
		const transformUnicodeFlag = options.unicodeFlag === 'transform';
		it('rewrites `/' + pattern + '/' + flags + '` with' + (transformUnicodeFlag ? 'out' : '') + ' unicode correctly', () => {
			const transpiled = rewritePattern(pattern, flags, options);
			const expected = fixture.expected;
			if (transpiled != '(?:' + expected + ')') {
				assert.strictEqual(transpiled, expected);
			}
			for (const match of fixture.matches || []) {
				const transpiledRegex = new RegExp(transpiled, getOutputFlags(flags, options));
				assert.match(match, transpiledRegex);
			}
			for (const nonMatch of fixture.nonMatches || []) {
				const transpiledRegex = new RegExp(transpiled, getOutputFlags(flags, options));
				assert.doesNotMatch(nonMatch, transpiledRegex);
			}
		});
	}
});

describe('unicodeSets (v) flag', () => {
	// Re-use the unicode fixtures but replacing the input pattern's `u` flag with `v` flag
	for (const fixture of unicodeFixtures) {
		if (fixture.flags.includes("u")) {
			for (let flag of fixture.flags) {
				flag = flag.replace("u", "v");
				const { pattern, transpiled: expected } = fixture;
				const inputRE = `/${pattern}/${flag}`;
				it(`rewrites \`${inputRE}\` correctly without using the u flag`, () => {
					const options = {
						unicodeSetsFlag: "transform",
						unicodeFlag: "transform",
					};
					const transpiled = rewritePattern(pattern, flag, options);
					if (transpiled != "(?:" + expected + ")") {
						assert.strictEqual(transpiled, expected);
					}
					for (const match of fixture.matches || []) {
						const transpiledRegex = new RegExp(transpiled, getOutputFlags(flag, options));
						assert.match(match, transpiledRegex);
					}
					for (const nonMatch of fixture.nonMatches || []) {
						const transpiledRegex = new RegExp(transpiled, getOutputFlags(flag, options));
						assert.doesNotMatch(nonMatch, transpiledRegex);
					}
				});
			}
		}
	}

	if (IS_NODE_6) return;

	for (const fixture of unicodeSetFixtures) {
		const pattern = fixture.pattern;
		const flags = fixture.flags || 'v';
		const options = fixture.options || { unicodeSetsFlag: 'transform' };
		const transformUnicodeFlag = options.unicodeFlag === 'transform';

		const inputRE = `/${pattern}/${flags}`;

		const expected = fixture.expected;
		const throws = fixture.throws;

		if (throws) {
			if (expected) {
				throw new Error(`TEST ERROR: ${inputRE} cannot both throw and have an expected output.`);
			}
			it(`throws for \`${inputRE}\` ${transformUnicodeFlag ? 'without ' : ''}using the u flag`, () => {
				assert.throws(() => {
					rewritePattern(pattern, flags, options);
				}, throws);
			});
		} else {
			const transpiled = rewritePattern(pattern, flags, options);
			it(`rewrites \`${inputRE}\` correctly ${transformUnicodeFlag ? 'without ' : ''}using the u flag`, () => {
				if (transpiled != '(?:' + expected + ')') {
					assert.strictEqual(transpiled, expected);
				}
			});
			for (const match of fixture.matches || []) {
				const transpiledRegex = new RegExp(transpiled, getOutputFlags(flags, options));
				assert.match(match, transpiledRegex);
			}
			for (const nonMatch of fixture.nonMatches || []) {
				const transpiledRegex = new RegExp(transpiled, getOutputFlags(flags, options));
				assert.doesNotMatch(nonMatch, transpiledRegex);
			}
		}
	}

	it('Property of strings used without the v flag', () => {
		assert.throws(() => {
			rewritePattern('\\p{Basic_Emoji}', 'u')
		}, /Properties of strings are only supported when using the unicodeSets \(v\) flag/);
	})
});

describe('modifiers', () => {
	for (const fixture of modifiersFixtures) {
		const {
			pattern,
			flags = '',
			expected,
			options = {}
		} = fixture;

		let actualFlags = flags;

		options.onNewFlags = (newFlags) => {
			actualFlags = newFlags;
		}
		if (options.modifiers === undefined) {
			options.modifiers = 'transform';
		}

		it('rewrites `/' + pattern + '/' + flags + '` correctly', () => {
			const transpiled = rewritePattern(pattern, flags, options);
			assert.strictEqual(transpiled, expected);
			if (fixture.expectedFlags != undefined) {
				assert.strictEqual(actualFlags, fixture.expectedFlags);
			}
			for (const match of fixture.matches || []) {
				const transpiledRegex = new RegExp(transpiled, getOutputFlags(flags, options));
				assert.match(match, transpiledRegex);
			}
			for (const nonMatch of fixture.nonMatches || []) {
				const transpiledRegex = new RegExp(transpiled, getOutputFlags(flags, options));
				assert.doesNotMatch(nonMatch, transpiledRegex);
			}
		});
	}

	it('No `modifiers:"transform"`', () => {
		assert.throws(() => {
			rewritePattern('(?i:a)', '');
		});
	})
});

