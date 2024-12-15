export type linearDirectionType = "right" | "left" | "down" | "up";
export type diagonalDirectionType = "right-down" | "left-down" | "right-up" | "left-up";
export type directionType = linearDirectionType | diagonalDirectionType;

// ? ----- COMMONS ----- //

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

// ? ----- PART 1 ----- //

/**
 * Check if there is enough place to check if the word is in the grid
 * @param grid Grid to check
 * @param x X position in current grid
 * @param y Y position in current grid
 * @param direction Direction to check
 * @returns True if there is enough place, false otherwise
 */
const checkIfIsEnoughPlace = (
  grid: string[][],
  x: number,
  y: number,
  direction: directionType,
) => {
  switch (direction) {
    case "right":
      return y + 3 < grid[x].length;
    case "left":
      return y - 3 >= 0;
    case "down":
      return x + 3 < grid.length;
    case "up":
      return x - 3 >= 0;
    case "right-down":
      return y + 3 < grid[x].length && x + 3 < grid.length;
    case "left-down":
      return y - 3 >= 0 && x + 3 < grid.length;
    case "right-up":
      return y + 3 < grid[x].length && x - 3 >= 0;
    case "left-up":
      return y - 3 >= 0 && x - 3 >= 0;
    default:
      return false;
  }
};

/**
 * Check if the word "MAS" is in the grid, after an "X" character
 * It will check in the position given horizontally or vertically
 * @param grid Grid to check
 * @param x X position in current grid
 * @param y Y position in current grid
 * @param direction Direction to check
 * @returns True if the word "MAS" is in the grid, false otherwise
 */
export const rowsColumnsCheck = (
  grid: string[][],
  x: number,
  y: number,
  direction: linearDirectionType,
): boolean => {
  const step = direction === "right" || direction === "down" ? 1 : -1;

  const isEnoughPlace = checkIfIsEnoughPlace(grid, x, y, direction);

  if (!isEnoughPlace)
    return false;

  return direction === "right" || direction === "left"
    ? grid[x][y + step] === "M"
    && grid[x][y + 2 * step] === "A"
    && grid[x][y + 3 * step] === "S"
    : grid[x + step][y] === "M"
    && grid[x + 2 * step][y] === "A"
    && grid[x + 3 * step][y] === "S";
};

/**
 * Check if the word "MAS" is in the grid, after an "X" character
 * It will check in the position given diagonally
 * @param grid Grid to check
 * @param x X position in current grid
 * @param y Y position in current grid
 * @param direction Direction to check
 * @returns True if the word "MAS" is in the grid, false otherwise
 */
export const diagonnalsCheck = (
  grid: string[][],
  x: number,
  y: number,
  direction: diagonalDirectionType,
): boolean => {
  const stepX = direction === "right-down" || direction === "left-down" ? 1 : -1;
  const stepY = direction === "right-down" || direction === "right-up" ? 1 : -1;

  const isEnoughPlace = checkIfIsEnoughPlace(grid, x, y, direction);

  if (!isEnoughPlace)
    return false;

  return grid[x + 1 * stepX][y + 1 * stepY] === "M"
    && grid[x + 2 * stepX][y + 2 * stepY] === "A"
    && grid[x + 3 * stepX][y + 3 * stepY] === "S";
};

/**
 * Call the right function to chck if the word "MAS" is in the grid
 * @param grid Grid to check
 * @param x X position in current grid
 * @param y Y position in current grid
 * @param direction Direction to check
 * @returns True if the word "MAS" is in the grid, false otherwise
 */
export const checkDirection = (
  grid: string[][],
  x: number,
  y: number,
  direction: directionType,
) => {
  switch (direction) {
    case "right":
    case "left":
    case "down":
    case "up":
      return rowsColumnsCheck(grid, x, y, direction);
    case "right-down":
    case "left-down":
    case "right-up":
    case "left-up":
      return diagonnalsCheck(grid, x, y, direction);
    default:
      return false;
  }
};

// ? ----- PART 2 ----- //

/**
 * Check if there is enough place to check if the word is in the grid
 * @param grid Grid to check
 * @param x X position in current grid
 * @param y Y position in current grid
 * @returns True if there is enough place, false otherwise
 */
export const checkIfIsEnoughPlaceXShape = (
  grid: string[][],
  x: number,
  y: number,
) => x - 1 >= 0
&& x + 1 < grid.length
&& y - 1 >= 0
&& y + 1 < grid[x].length;

/**
 * Check if the word "MAS" is in the grid, after an "A" character
 * It will check in the position given diagonally
 * @param grid Grid to check
 * @param x X position in current grid
 * @param y Y position in current grid
 * @returns True if the word "MAS" is in the grid, false otherwise
 */
export const checkXMas = (
  grid: string[][],
  x: number,
  y: number,
) => {
  const isEnoughPlace = checkIfIsEnoughPlaceXShape(grid, x, y);

  if (!isEnoughPlace)
    return false;

  const checkFirstMAS = (
    grid[x + 1][y + 1] === "M"
    && grid[x - 1][y - 1] === "S"
  ) || (
    grid[x + 1][y + 1] === "S"
    && grid[x - 1][y - 1] === "M"
  );

  const checkSecondMAS = (
    grid[x + 1][y - 1] === "M"
    && grid[x - 1][y + 1] === "S"
  ) || (
    grid[x + 1][y - 1] === "S"
    && grid[x - 1][y + 1] === "M"
  );

  return checkFirstMAS && checkSecondMAS;
};
