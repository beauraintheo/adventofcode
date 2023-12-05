import { maxCubes } from "./constants";

/**
 * Get the number of cubes of each color from a draw
 * @param draw The draw to parse
 * @returns An object with the number of cubes of each color
 */
export const getCubesFromDraw = (draw: string): { [key: string]: number } => draw.split(",").reduce(
    (acc: { [key: string]: number }, value: string): { [key: string]: number } => {
        const [ cubes, color ] = value.trim().split(" ");
        
        return { ...acc, [color]: parseInt(cubes)};
    }, {}
);

/**
 * Check if a draw is valid
 * @param draw The draw to check
 * @returns true if the draw is valid, false otherwise
 */
export const checkIfDrawIsValid = (draw: { [key: string]: number }): boolean => Object.entries(draw).every(
    ([ color, value ]: [string, number]) => maxCubes[color] < value ? false : true
);

/**
 * Validate a game : if all the draws are valid, the game is valid
 * @param game The game to validate
 * @returns true if the game is valid, false otherwise
 */
export const validateGame = (game: string): boolean => game.split(";").every(
    (draw: string) => {
        const cubesByColors = getCubesFromDraw(draw);
        return checkIfDrawIsValid(cubesByColors);
    }
);