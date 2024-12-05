import { forbiddenStrings, vowels } from "./constants";

/**
 * Checks if a string contains at least 3 vowels
 * @param word The string to check
 * @returns True if the string contains at least 3 vowels, false otherwise
 */
export const contain3OrMoreVowels = (
  word: string,
): boolean => {
  const vowelCount = [ ...word ].reduce((
    count: number,
    letter: string,
  ): number => vowels.includes(letter)
    ? count + 1
    : count, 0);

  return vowelCount >= 3;
};

/**
 * Checks if a string contains at least one letter that appears twice in a row
 * @param word The string to check
 * @returns True if the string contains at least one letter that appears twice in a row, false otherwise
 */
export const containDoubleLetter = (
  word: string,
): boolean => [ ...word ].some((
  letter: string,
  index: number,
  array: string[],
): boolean => index > 0 && letter === array[index - 1]);

/**
 * Checks if a string contains any of the forbidden strings
 * @param word The string to check
 * @returns True if the string contains any of the forbidden strings, false otherwise
 */
export const containForbiddenStrings = (
  word: string,
): boolean => [ ...forbiddenStrings ].some((
  forbiddenString: string,
): boolean => word.includes(forbiddenString));

/**
 * Checks if a string contains a pair of any two letters that appears at least twice in the string without overlapping
 * @param word The string to check
 * @returns True if the string contains the pair, false otherwise
 */
export const containPairOfTwoLetters = (
  word: string,
): boolean => [ ...word ].some((
  letter: string,
  index: number,
): boolean => {
  if (index > 0) {
    const letterPair = `${word[index - 1]}${letter}`;
    return word.includes(letterPair, index + 1);
  }

  return false;
});

/**
 * Checks if a string contains at least one letter which repeats with exactly one letter between them
 * @param word The string to check
 * @returns True if the string contains the repeating letter, false otherwise
 */
export const containRepeatingLetterWithOneLetterBetween = (
  word: string,
): boolean => [ ...word ].some((
  letter: string,
  index: number,
  array: string[],
): boolean => {
  if (index > 1)
    return letter === array[index - 2];
  return false;
});
