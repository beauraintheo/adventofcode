/**
 * Check if there is enough place to check if the word is in the grid
 * @param grid Grid to check
 * @param x X position in current grid
 * @param y Y position in current grid
 * @returns True if there is enough place, false otherwise
 */
export const checkIfIsEnoughPlace = (
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
  const isEnoughPlace = checkIfIsEnoughPlace(grid, x, y);

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
