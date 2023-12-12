import { startByCard } from "./constants";
import { removeTextFromString } from "../utils/utils";
import { sumWinningNumbers } from "./utils";

const part1 = (file: string[]): number => {
	// Remove "Card X: " from each line
	const formattedFile = file.map((line: string) => removeTextFromString(line, startByCard));
	// Split each line by "|" and all numbers by " "
	const parsedFile = formattedFile.map((line) => line.split("|").map(value => value.trim().split(" ")));

	// Sum all winning numbers
	// Each number is worth 1 point, and each other number multiply current score by 2
	return parsedFile.reduce((acc, [ numbers, currentDraft ]) => sumWinningNumbers(numbers, currentDraft) + acc, 0);
};

export default part1;