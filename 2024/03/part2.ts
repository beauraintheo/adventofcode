export const part2 = (
  file: string[],
): number => {
// Get all multiplications in the file format like "mul(X,X)", where X is a number
  const matches = file.map(line => [ ...line.matchAll(/(do\(\))|(don\'t\(\))|(mul\([0-9]+,[0-9]+\))/g) ]);
  const multiplications = matches
    .reduce((acc, curr) => [ ...acc, ...curr ], [])
    .map(match => match[0]);

  // Calculate the result of all multiplications
  // If there's an operator, enable or disable the multiplication. By default, it's enabled
  return multiplications.reduce((acc, curr) => {
    if (curr === "do()")
      return { ...acc, enabled: true };

    if (curr === "don't()")
      return { ...acc, enabled: false };

    if (acc.enabled) {
      const match = curr.match(/[0-9]+/g);

      if (!match)
        return acc;

      const [ a, b ] = match.map(Number);
      return { ...acc, result: acc.result + a * b };
    }

    return acc;
  }, { result: 0, enabled: true }).result;
};
