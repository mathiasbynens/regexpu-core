const regenerate = require('regenerate');

const codePointToString = (codePoint) => {
	return '0x' + codePoint.toString(16).toUpperCase();
};

// Regenerate plugin that turns a set into some JavaScript source code that
// generates that set.
regenerate.prototype.toCode = function regenerateToCode() {
	const data = this.data;
	// Iterate over the data per `(start, end)` pair.
	let index = 0;
	let start;
	let end;
	const length = data.length;
	const loneCodePoints = [];
	const ranges = [];
	while (index < length) {
		start = data[index];
		end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
		if (start == end) {
			loneCodePoints.push(codePointToString(start));
		} else {
			ranges.push(
				'addRange(' + codePointToString(start) +
				', ' + codePointToString(end) + ')'
			);
		}
		index += 2;
	}
	return 'regenerate(' + loneCodePoints.join(', ') + ')' +
		(ranges.length ? '\n\t\t.' + ranges.join('\n\t\t.') : '');
};