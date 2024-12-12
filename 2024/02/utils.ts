/**
 * Method to check if the numbers are sorted in the given order
 * @param numbers Array of numbers to check
 * @param compare Function to compare the numbers
 * @returns True if the numbers are sorted in the given order, false otherwise
 */
export const isSorted = (
  numbers: number[],
  compare: (a: number, b: number) => boolean,
): boolean => numbers.every((num, i, arr) => i === 0 || compare(arr[i - 1], num));

/**
 * Method to check if the numbers are sorted in ascending order
 * @param numbers Array of numbers to check
 * @returns True if the numbers are sorted in ascending order, false otherwise
 */
export const isAscending = (numbers: number[]): boolean => isSorted(numbers, (a, b) => a <= b);

/**
 * Method to check if the numbers are sorted in descending order
 * @param numbers Array of numbers to check
 * @returns True if the numbers are sorted in descending order, false otherwise
 */
export const isDescending = (numbers: number[]): boolean => isSorted(numbers, (a, b) => a >= b);

/**
 * Method to check if the difference between each number is between 1 and 3
 * @param numbers Array of numbers to check
 * @returns True if the difference between each number is between 1 and 3, false otherwise
 */
export const difference = (numbers: number[]): boolean => {
  const isAscending = numbers[0] < numbers[numbers.length - 1];

  return isAscending
    ? numbers.every((num, i, arr) => i === 0 || (num - arr[i - 1] >= 1 && num - arr[i - 1] <= 3))
    : numbers.every((num, i, arr) => i === 0 || (arr[i - 1] - num >= 1 && arr[i - 1] - num <= 3));
};

/**
 * Method to check if the numbers are sorted in ascending or descending order and the difference between each number is between 1 and 3
 * We remove one number at a time and check if the remaining numbers are sorted
 * @param numbers Array of numbers to check
 * @returns True if the numbers are sorted in ascending or descending order and the difference between each number is between 1 and 3, false otherwise
 */
export const checkWithOneLevelRemoved = (
  numbers: number[],
): boolean => numbers.some((_, i) => {
  const newNumbers = [
    ...numbers.slice(0, i),
    ...numbers.slice(i + 1),
  ];

  return (
    isAscending(newNumbers)
    || isDescending(newNumbers)
  ) && difference(newNumbers);
});
