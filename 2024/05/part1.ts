import { checkPagesOrder, getChildrensAndParents } from "./utils";

/**
 * Method to return the sum of the middle elements of the correct pages.
 * It will parse all rules as a list of parents and childrens and all pages to display.
 * @param file - The input file. Take in input a list of rules (parent|child) and a list of pages to display
 * @returns The sum of the middle elements of the correct pages
 */
export const part1 = (
  file: string[],
): number => {
  const rules = file
    .flatMap(line => line.match(/([0-9]+\|[0-9]+)/gi))
    .filter(Boolean) as string[];

  const pagesToDisplay = file
    .slice(rules.length + 1)
    .map(line => line.split(",").map(Number));

  const rulesChildrensAndParents = getChildrensAndParents(rules);

  const correctPages = checkPagesOrder(
    pagesToDisplay,
    rulesChildrensAndParents,
    true,
  );

  return correctPages.reduce(
    (acc, curr) => {
      if (Array.isArray(curr))
        return acc + curr[curr.length / 2 - 0.5];

      return acc;
    },
    0,
  );
};
