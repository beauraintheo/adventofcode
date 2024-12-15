import { checkDirection, findIndexesChar } from "./utils";
import type { directionType } from "./utils";

const directions: directionType[] = [
  "up",
  "down",
  "left",
  "right",
  "right-down",
  "right-up",
  "left-down",
  "left-up",
];

/**
 * Count the numbers of occurences of "MAS" in the grid after an "X" character. It will check in all directions
 * @param file Input file
 * @returns Number of occurences of "MAS" in the grid after an "X" character
 */
export const part1 = (
  file: string[],
): number => {
  const xIndexes = findIndexesChar(file, "X");
  const grid = file.map(a => a.split(""));

  // Count the number of occurences of "MAS" in all directions
  return xIndexes.reduce((acc, curr) => {
    const [ x, y ] = curr.split(",").map(a => Number.parseInt(a, 10));

    return directions.reduce(
      (count, direction) => checkDirection(grid, x, y, direction)
        ? count + 1
        : count,
      acc,
    );
  }, 0);
};
