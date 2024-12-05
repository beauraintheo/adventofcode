import * as fs from "node:fs";
import * as process from "node:process";

import { part1 } from "./part1";
import { part2 } from "./part2";

const filePath = process.argv[2];

if (!filePath || !filePath.endsWith(".txt")) {
  console.error("Don't forget to provide the input file inside the current folder");
  process.exit(1);
}

try {
  const fileContent = fs.readFileSync(filePath, "utf8").split("\n");
  console.warn("Result part 1: ", part1(fileContent));
  console.warn("Result part 2: ", part2(fileContent));
}
catch (err) {
  console.error(err);
}
