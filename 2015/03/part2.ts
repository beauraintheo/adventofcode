import { directionMap } from "./constants";
import { getUniqueHouses } from "./utils";

/**
 * Method to get all houses visited by Santa and Robot
 * @param file Array of strings containing the directions
 * @returns 2 arrays of houses visited by Santa and Robot
 */
const getVisitedHouses = (
  file: string[],
): [
  { x: number; y: number }[],
  { x: number; y: number }[],
] => file[0]
  .split("")
  .reduce((
    [ santaHouse, robotHouse ],
    nextDirection,
    index,
  ) => {
  // Get last house visited position & next direction
    const lastHouse = index % 2 === 0
      ? santaHouse[santaHouse.length - 1]
      : robotHouse[robotHouse.length - 1];

    const direction = directionMap[nextDirection];

    // Create new house position with last house position and next direction
    const newHouse = {
      x: lastHouse.x + direction.x,
      y: lastHouse.y + direction.y,
    };

    // Add next house position to the list of houses positions
    // If odd, add to Santa's houses, else add to Robot's houses visided
    return index % 2 === 0
      ? [
          [ ...santaHouse, newHouse ],
          robotHouse,
        ]
      : [
          santaHouse,
          [ ...robotHouse, newHouse ],
        ];
  }, [
    [ { x: 0, y: 0 } ],
    [ { x: 0, y: 0 } ],
  ] as [
    { x: number; y: number }[],
    { x: number; y: number }[],
  ]);

/**
 * Method to get all houses visited by Santa and Robot
 * @param file Array of strings containing the directions
 * @returns The number of houses visited
 */
export const part2 = (file: string[]): number => {
  // Get all houses visited by Santa and Robot
  // Each house has an position { x: number, y: number }, add to an array of all houses
  // If odd, add to Santa's houses, else add to Robot's houses visided
  const [ santaHouses, robotHouses ] = getVisitedHouses(file);

  // Get all unique houses visited by Santa and Robot, and concatenate them
  const uniqueSantaHouses = getUniqueHouses(santaHouses);
  const uniqueRobotHouses = getUniqueHouses(robotHouses);

  const uniqueHouses = new Map<string, number>([
    ...uniqueSantaHouses,
    ...uniqueRobotHouses,
  ]);

  return uniqueHouses.size;
};
