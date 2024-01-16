import getFirstNumber from "./utils";

/**
 * Method to get the sum of the first and last number of each line
 * @param file File to parse
 * @returns Sum of the first and last number of each line
 */
const part1 = (file: string[]): number => file.reduce(
	(acc: number, line: string) => {
		// Get first number of the current line
		const getFirstNumberLine = getFirstNumber(line);
		// Get last number of the current line
		const getLastNumberLine = getFirstNumber(line.split("").reverse().join(""));

		return acc + parseInt(`${getFirstNumberLine}${getLastNumberLine}`);
	}
	, 0
);

export default part1;