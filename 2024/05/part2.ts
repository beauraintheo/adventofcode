import {
  checkPagesOrder,
  getChildrensAndParents,
  reorderPages,
} from "./utils";

/**
 * Method to return the correct ordered pages based on the rules.
 * It will reorder the pages based on the rules and return the sum of the middle elements of the correct pages.
 * @param file - The input file. Take in input a list of rules (parent|child) and a list of pages to display
 * @returns The sum of the middle elements of the correct pages
 */
export const part2 = (
  file: string[],
): number => {
  const rules = file
    .flatMap(line => line.match(/([0-9]+\|[0-9]+)/gi))
    .filter(Boolean) as string[];

  const pagesToDisplay = file
    .slice(rules.length + 1)
    .map(line => line.split(",").map(Number));

  const rulesChildrensAndParents = getChildrensAndParents(rules);
  const uncorrectPages = checkPagesOrder(
    pagesToDisplay,
    rulesChildrensAndParents,
    false,
  );

  const pagesCorrection = uncorrectPages
    .filter(pages => pages !== false)
    .map(pages => reorderPages(pages as number[], rulesChildrensAndParents));

  return pagesCorrection.reduce(
    (acc, curr) => {
      if (Array.isArray(curr))
        return acc + curr[curr.length / 2 - 0.5];

      return acc;
    },
    0,
  );
};
