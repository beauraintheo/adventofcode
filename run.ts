import * as process from "node:process";
import { execSync } from "node:child_process";

const [ year, day ] = process.argv.slice(2);

if (!year || !day) {
  console.error("Usage: run.ts <year> <day>");
  process.exit(1);
}

const indexPath = `./${year}/${day}/index.ts`;
const filePath = `./${year}/${day}/input.txt`;

try {
  execSync(`tsx ${indexPath} ${filePath}`, { stdio: "inherit" });
}
catch (error) {
  console.error(`Failed to execute ${indexPath}`, error);
  process.exit(1);
}
