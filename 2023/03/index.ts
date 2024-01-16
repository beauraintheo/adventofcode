import fs = require("fs");

import part1 from "./part1";
import part2 from "./part2";

const filePath = process.argv[2];

try {
	const fileContent = fs.readFileSync(filePath, "utf8").split("\n");
	console.log("Result part 1: ", part1(fileContent));
	console.log("Result part 2: ", part2(fileContent));
} catch (err) {
	console.error(err);
}

