import { containPairOfTwoLetters, containRepeatingLetterWithOneLetterBetween } from "./utils";

/**
 * Find the lowest positive number that produces a hash with 6 leading zeroes
 * @param file Array of strings containing the directions
 * @returns The lowest positive number that produces a hash with 6 leading zeroes
 */
export const part2 = (
  file: string[],
): number => file.reduce((
  correctWords: number,
  word: string,
): number => {
  if (
    containPairOfTwoLetters(word)
    && containRepeatingLetterWithOneLetterBetween(word)
  ) return correctWords + 1;
  return correctWords;
}, 0);
