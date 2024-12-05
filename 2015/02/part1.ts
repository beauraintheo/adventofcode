/**
 * Method to calculate the smallest area of a perfect rectangular prism
 * @param length Length of the prism
 * @param width Width of the prism
 * @param height Height of the prism
 * @returns The smallest area of the prism
 */
const smallestAreaSize = (
  length: number,
  width: number,
  height: number,
): number => Math.min(
  length * width,
  width * height,
  length * height,
);

/**
 * Method to calculate the size of a perfect rectangular prism
 * @param length Length of the prism
 * @param width Width of the prism
 * @param height Height of the prism
 * @returns The size of the prism
 */
const prismSize = (
  length: number,
  width: number,
  height: number,
): number => (2 * length * width) + (2 * width * height) + (2 * length * height);

/**
 * Method to calculate the total square feet of wrapping paper needed for a perfect rectangular prism
 * Giving a dimension lxwxh, we need to calculate the surface area of the prism more the area of the smallest side
 * @param file Array of strings containing the dimensions of the gifts
 * @returns The total square feet of wrapping paper needed
 */
export const part1 = (
  file: string[],
): number => file
  .map(gift => gift.split("x").map(Number))
  .reduce((
    size: number,
    [
      length,
      width,
      height,
    ]: number[],
  ): number => size
  + smallestAreaSize(length, width, height)
  + prismSize(length, width, height), 0);
