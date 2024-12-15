import { findIndexesChar } from "./commons";
import {
  checkDirection,
  type directionType,
} from "./functionsPart1";

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
 *
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
