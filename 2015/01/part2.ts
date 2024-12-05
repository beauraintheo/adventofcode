/**
 * Method to get when index -1 is reached for the first time
 * Each line is a list of steps, where "(" is up and ")" is down
 * @param file File to parse
 * @returns Sum of the first and last number of each line
 */
export const part2 = (
  file: string[],
): number => {
  const steps = file[0].split("");

  return steps.findIndex(
    (_, i) => steps
      .slice(0, i + 1)
      .reduce(
        (acc, curr) => curr === "("
          ? acc + 1
          : acc - 1
        , 0,
      ) === -1,
  ) + 1;
};
