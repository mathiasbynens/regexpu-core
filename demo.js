'use strict';

const rewritePattern = require('./rewrite-pattern.js');
const parse = require('regjsparser').parse;
const generate = require('regjsgen').generate;
const regenerate = require('regenerate');

const pattern = String.raw`-`;

console.log(generate(parse(pattern)));
console.log(regenerate('-'.codePointAt(0)).toString())

const processedPattern = rewritePattern(pattern, 'u', { useUnicodeFlag: true });

console.log(processedPattern);

// throws
new RegExp(processedPattern, 'u');
