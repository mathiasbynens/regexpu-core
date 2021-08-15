'use strict';

const rewritePattern = require('./rewrite-pattern.js');
const parse = require('regjsparser').parse;
const generate = require('regjsgen').generate;
const regenerate = require('regenerate');

const pattern = '\\w';

console.log(generate(parse(pattern)));

const processedPattern = rewritePattern(pattern, 'ui', {
	'unicodeFlag': 'transform'
})

console.log(processedPattern);

// throws
new RegExp(processedPattern, 'u');
