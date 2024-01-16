import { startByGame } from "./constants";
import { validateGame } from "./utils";
import { removeTextFromString } from "../utils/utils";

const part1 = (file: string[]): number => {
	// Remove "Game X: " from each line
	const formattedGames = file.map((line: string) => removeTextFromString(line, startByGame));

	// Check if each draw is valid, and return the sum of the index of the valid draws
	return formattedGames.reduce(
		(acc: number, game: string, index: number) => validateGame(game)
			? acc + (index + 1)
			: acc, 0
	);
};

export default part1;