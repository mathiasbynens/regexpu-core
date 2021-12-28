'use strict';

const rewritePattern = require('./rewrite-pattern.js');
const parse = require('regjsparser').parse;
const generate = require('regjsgen').generate;
const regenerate = require('regenerate');

const pattern = String.raw`[\p{Basic_Emoji}&&\q{😷|©️|dog}]`;

const processedPattern = rewritePattern(pattern, 'v', {
	'unicodeSetsFlag': 'transform'
});

console.log(processedPattern);

