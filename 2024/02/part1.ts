import {
  difference,
  isAscending,
  isDescending,
} from "./utils";

/**
 * Method to count the number of occurences of the first number of each line in the last number of each line
 * @param file File to parse
 * @returns Number of occurences of the first number of each line in the last number of each line
 */
export const part1 = (
  file: string[],
): number => {
  const parsedFile = file.map(line => line.split(" ").map(number => Number.parseInt(number, 10)));

  return parsedFile.reduce(
    (acc, curr) =>
      (isAscending(curr) || isDescending(curr))
      && difference(curr)
        ? acc + 1
        : acc,
    0,
  );
};
