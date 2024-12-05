import {
  contain3OrMoreVowels,
  containDoubleLetter,
  containForbiddenStrings,
} from "./utils";

export const part1 = (
  file: string[],
): number => file.reduce((
  correctWords: number,
  word: string,
): number => {
  if (containForbiddenStrings(word))
    return correctWords;
  if (contain3OrMoreVowels(word) && containDoubleLetter(word))
    return correctWords + 1;

  return correctWords;
}, 0);
