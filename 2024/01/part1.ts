/**
 * Method to parse a file and return the sum of the first and last number of each line
 * @param file File to parse
 * @returns Sum of the first and last number of each line
 */
export const part1 = (
  file: string[],
): number => {
  const mappedNumbers = file.map(line => line.split(" ").filter(Boolean).map(Number));

  const firstArr = mappedNumbers.map(arr => arr[0]).sort((a, b) => a - b);
  const secondArr = mappedNumbers.map(arr => arr[arr.length - 1]).sort((a, b) => a - b);

  return firstArr.reduce((acc, curr, index) => {
    if (curr > secondArr[index])
      return curr - secondArr[index] + acc;
    else return secondArr[index] - curr + acc;
  }, 0);
};
