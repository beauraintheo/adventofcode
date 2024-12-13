/**
 * Method to parse all multiplications in an corrupted file and return the sum of the results
 * @param file Line to parse
 * @returns Sum of the results of all multiplications
 */
export const part1 = (
  file: string[],
): number => {
  // Get all multiplications in the file format like "mul(X,X)", where X is a number
  const matches = file.map(line => [ ...line.matchAll(/(mul\([0-9]+,[0-9]+\))/g) ]);
  const multiplications = matches
    .reduce((acc, curr) => [ ...acc, ...curr ], [])
    .map(match => match[0]);

  return multiplications.reduce((acc, curr) => {
    const match = curr.match(/[0-9]+/g);

    if (!match)
      return acc;

    const [ a, b ] = match.map(Number);
    return acc + a * b;
  }, 0);
};
