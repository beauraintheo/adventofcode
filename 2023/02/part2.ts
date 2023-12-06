import { removeTextFromString } from "../utils/utils";
import { getMaxCubesPerGame } from "./utils";

const part1 = (file: string[]): number => {
    // Remove "Game X: " from each line
    const formattedGames = file.map((line: string) => removeTextFromString(line, /^Game \d+: /));

    // Get the power of the cubes after each game, and sum them
    return formattedGames.reduce(
        (acc: number, game: string, index: number) => {
            // Get the maximum number of cubes of each color from the game
            const maxCubesPerGame = getMaxCubesPerGame(game);
            // Get the power of the cubes
            const cubesPower = Object.values(maxCubesPerGame).reduce((acc, value) => acc * value, 1);

            return acc + cubesPower;
        }, 0
    );
};

export default part1;