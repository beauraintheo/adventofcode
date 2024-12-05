import CryptoJS from "crypto-js";

/**
 * Find the lowest positive number that produces a hash with 5 leading zeroes
 * @param word Word to hash
 * @param numberOfZeroes Number of zeroes to check for
 * @param index Index to append to the word
 * @returns The lowest positive number that produces a hash with 5 leading zeroes
 */
export const hashedWord = (
  word: string,
  numberOfZeroes: string,
  index: number,
): number => {
  // Helper function to check if the hash starts with 5 zeroes.
  // Use this to bypass maximum call stack size exceeded (with tail call optimization)
  const helper = (
    word: string,
    index: number,
  ): number => CryptoJS
    .MD5(word)
    .toString()
    .startsWith(numberOfZeroes)
    ? index
    : -1;

  // Loop until the hash starts with 5 zeroes
  while (true) {
    const result = helper(word + index, index);

    if (result !== -1)
      return index;

    index++;
  }
};
