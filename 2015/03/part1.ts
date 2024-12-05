import { directionMap } from "./constants";
import { getUniqueHouses } from "./utils";

/**
 * Method to get all houses visited by Santa
 * @param file Array of strings containing the directions
 * @returns Array of positions { x: number, y: number }
 */
const getVisitedHouses = (
  file: string[],
): {
  x: number;
  y: number;
}[] => {
  const houses = file[0]
    .split("")
    .reduce(
      (houses, nextDirection) => {
        // Get last house visited position & next direction
        const lastHouse = houses[houses.length - 1];
        const direction = directionMap[nextDirection];

        // Add next house position to the list of houses positions
        return direction
          ? [
              ...houses,
              {
                x: lastHouse.x + direction.x,
                y: lastHouse.y + direction.y,
              },
            ]
          : houses;
      },
      [ { x: 0, y: 0 } ],
    );

  return houses;
};

/**
 * Method to get all houses visited by Santa
 * @param file Array of strings containing the directions
 * @returns The number of houses visited
 */
export const part1 = (
  file: string[],
): number => {
  const houses = getVisitedHouses(file);

  return getUniqueHouses(houses).size;
};
