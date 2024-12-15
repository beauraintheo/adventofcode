import { findIndexesChar } from "./commons";
import { checkXMas } from "./functionsPart2";

/**
 * Count the number of occurences of "MAS" in a cross direction. Each "MAS" should appears as an X shape
 * @param file Input file
 * @returns Number of occurences of "MAS" in the grid as an X shape
 */
export const part2 = (
  file: string[],
): number => {
  const aIndexes = findIndexesChar(file, "A");
  const grid = file.map(a => a.split(""));

  return aIndexes.reduce((acc, curr) => {
    const [ x, y ] = curr.split(",").map(a => Number.parseInt(a, 10));

    return checkXMas(grid, x, y)
      ? acc + 1
      : acc;
  }, 0);
};
