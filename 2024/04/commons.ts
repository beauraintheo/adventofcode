/**
 * Find all indexes of a character in a file
 * @param file File to check
 * @param char Character to find
 * @returns Array of indexes of the character in the file
 */
export const findIndexesChar = (file, char) => file
  .map(
    (line, index) => [
      ...line.matchAll(new RegExp(`${char}`, "gi")),
    ].map(a => `${index},${a.index}`),
  )
  .flatMap(a => a);
