/**
 * Method to get all unique houses visited
 * @param houses Array of positions { x: number, y: number }
 * @returns A map of unique houses
 */
export const getUniqueHouses = (
  houses: {
    x: number;
    y: number;
  }[],
) => houses.reduce(
  (
    acc: Map<string, number>,
    curr: {
      x: number;
      y: number;
    },
  ) => {
    const positionKey = `${curr.x},${curr.y}`;
    acc.set(positionKey, (acc.get(positionKey) || 0) + 1);

    return acc;
  },
  new Map<string, number>(),
);
