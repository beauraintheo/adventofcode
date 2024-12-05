/**
 * Method to get the smallest two sides of a perfect rectangular prism
 * @param length Length of the prism
 * @param width Width of the prism
 * @param height Height of the prism
 * @returns An array containing the two smallest sides
 */
const getSmallestSizes = (
  length: number,
  width: number,
  height: number,
): number[] => {
  const [ , ...rest ] = [
    length,
    width,
    height,
  ].sort((a, b) => a - b);

  return rest;
};

/**
 * Method to calculate the total length of ribbon needed for a perfect rectangular prism
 * Each ribbon length is the smallest perimeter of any one face, plus the volume of the same prism
 * @param file Array of strings containing the dimensions of the gifts
 * @returns The total length of ribbon needed
 */
export const part2 = (file: string[]): number => file
  .map(gift => gift.split("x").map(Number))
  .reduce((
    size: number,
    [ length, width, height ]: number[],
  ): number => {
    // Get the two smallest sides
    const smallestSizes = getSmallestSizes(length, width, height)
      .slice()
      .reverse();

    return size
      + (smallestSizes[0] * 2)
      + (smallestSizes[1] * 2)
      + (length * width * height);
  }, 0);
