/**
 * Method to get the sum of the first and last number of each line
 * @param file File to parse
 * @returns Sum of the first and last number of each line
 */
export const part1 = (
  file: string[],
): number => file[0]
  .split("")
  .reduce(
    (floor, currBracket) => currBracket === "("
      ? floor + 1
      : floor - 1
    , 0,
  );
