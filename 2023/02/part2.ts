import { startByGame } from "./constants";
import { getMaxCubesPerGame } from "./utils";
import { removeTextFromString } from "../utils/utils";

const part1 = (file: string[]): number => {
	// Remove "Game X: " from each line
	const formattedGames = file.map((line: string) => removeTextFromString(line, startByGame));

	// Get the power of the cubes after each game, and sum them
	return formattedGames.reduce(
		(acc: number, game: string) => {
			// Get the maximum number of cubes of each color from the game
			const maxCubesPerGame = getMaxCubesPerGame(game);
			// Get the power of the cubes
			const cubesPower = Object.values(maxCubesPerGame).reduce((acc, value) => acc * value, 1);

			return acc + cubesPower;
		}, 0
	);
};

export default part1;