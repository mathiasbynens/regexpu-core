var assert = require('assert');
var rewritePattern = require('../rewrite-pattern.js');
var fixtures = require('regexpu-fixtures');

describe('rewritePattern', function() {
	fixtures.forEach(function(fixture) {
		var pattern = fixture.pattern;
		fixture.flags.forEach(function(flag) {
			it('rewrites `/' + pattern + '/' + flag + '` correctly', function() {
				assert.equal(rewritePattern(pattern, flag), fixture.transpiled);
			});
		});
	});
});
