"use strict";

const fs = require("fs");

const writeRequires = function () {
	const unicodeProperties = require("regenerate-unicode-properties");

	const requires = [];

	for (let [k, v] of unicodeProperties) {
		v.forEach((i) => {
			const newKey = `${k}/${i}`;
			requires.push(`\t'${newKey}': () =>`);
			requires.push(
				`\t\trequire('regenerate-unicode-properties/${newKey}.js'),`
			);
		});
	}
	// console.log(requires.join("\n"));
	fs.writeFileSync(
		"unicode-properties.js",
		`module.exports = {\n${requires.join("\n")}\n}\n`
	);
};

writeRequires();
