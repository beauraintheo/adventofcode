import { hashedWord } from "./utils";

/**
 * Find the lowest positive number that produces a hash with 6 leading zeroes
 * @param file Array of strings containing the directions
 * @returns The lowest positive number that produces a hash with 6 leading zeroes
 */
export const part2 = (file: string[]): number => hashedWord(file[0], "000000", 0);
