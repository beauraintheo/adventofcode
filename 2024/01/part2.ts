/**
 * Method to count the number of occurences of the first number of each line in the last number of each line
 * @param file File to parse
 * @returns Number of occurences of the first number of each line in the last number of each line
 */
export const part2 = (
  file: string[],
): number => {
  const mappedNumbers = file.map(line => line.split(" ").filter(Boolean).map(Number));

  const firstArr = mappedNumbers.map(arr => arr[0]);
  const secondArr = mappedNumbers.map(arr => arr[arr.length - 1]);

  return firstArr.reduce((acc, curr) => {
    const nbOccurences = secondArr.filter(nb => nb === curr).length;

    return acc + nbOccurences * curr;
  }, 0);
};
