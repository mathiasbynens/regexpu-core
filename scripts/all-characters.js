const fs = require('node:fs');
const regenerate = require('regenerate');
require('./utils/regenerate-plugin-to-code.js');

const commonMappings = require('@unicode/unicode-17.0.0/Case_Folding/C/code-points.js');
const simpleMappings = require('@unicode/unicode-17.0.0/Case_Folding/S/code-points.js');

// https://tc39.es/ecma262/#sec-allcharacters
const UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
const UNICODE_IV_SET = regenerate().addRange(0x0, 0x10FFFF);

for (const cp of commonMappings.keys()) {
    UNICODE_IV_SET.remove(cp);
}
for (const cp of simpleMappings.keys()) {
    UNICODE_IV_SET.remove(cp);
}

const stringify = (name, set) => {
	const source = 'exports.' + name + ' = ' + set.toCode();
	return source;
};

const source = [
    '// Generated using `npm run build`. Do not edit.\n' +
	`'use strict';\n\nconst regenerate = require('regenerate');`,
    stringify('UNICODE_SET', UNICODE_SET),
    stringify('UNICODE_IV_SET', UNICODE_IV_SET)
].join('\n\n');

fs.writeFileSync('data/all-characters.js', source + '\n');
