import { validDigits, validReversedDigits } from "./constants";
import getFirstNumber from "./utils";

/**
 * Method to get the sum of the first and last number of each line
 * Each number can be written in litteral or in digit
 * @param file File to parse
 * @returns Sum of the first and last number of each line
 */
const part2 = (file: string[]): number => file.reduce(
	(acc: number, line: string) => {
		// Check if current line contains litteral numbers, and replace them by their digit equivalent
		const currentLine = line.replace(/one|two|three|four|five|six|seven|eight|nine/gi, (match: string) => String(validDigits[match]));
		// Check if current line contains reversed litteral numbers, and replace them by their digit equivalent
		const currentReversedLine = line
		.split("")
		.reverse()
		.join("")
		.replace(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/gi, (match: string) => String(validReversedDigits[match]));

		// Get first number of the current line
		const getFirstNumberLine = getFirstNumber(currentLine);
		// Get last number of the current line
		const getLastNumberLine = getFirstNumber(currentReversedLine);

		return acc + parseInt(`${getFirstNumberLine}${getLastNumberLine}`);
	}
	, 0
);

export default part2;