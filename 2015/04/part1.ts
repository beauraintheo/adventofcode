import { hashedWord } from "./utils";

/**
 * Find the lowest positive number that produces a hash with 5 leading zeroes
 * @param file Array of strings containing the directions
 * @returns The lowest positive number that produces a hash with 5 leading zeroes
 */
export const part1 = (
  file: string[],
): number => hashedWord(file[0], "00000", 0);
