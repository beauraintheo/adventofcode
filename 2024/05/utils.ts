export type RulesOrdered = Record<string, { parents: number[]; childrens: number[] }>;

/**
 * Method to return an object with all childrens and parents of each rule.
 * @param rules - The list of rules to parse
 * @returns An object with all childrens and parents of each rule
 */
export const getChildrensAndParents = (
  rules: string[],
): RulesOrdered => rules.reduce((acc, curr) => {
  const [ parent, child ] = curr.split("|").map(Number);

  return {
    ...acc,
    [parent]: {
      ...acc[parent],
      childrens: [
        ...(acc[parent]?.childrens || []),
        child,
      ],
    },
    [child]: {
      ...acc[child],
      parents: [
        ...(acc[child]?.parents || []),
        parent,
      ],
    },
  };
}, {});

/**
 * Method to return the correct ordered pages based on the rules.
 * If the length of the correct ordered pages is different from the original pages, it will return false.
 * @param pages - The list of pages to check
 * @param rules - The list of rules to check
 * @param returnOrdered - If the pages should be correct or not
 * @returns The correct ordered pages
 */
export const checkPagesOrder = (
  pages: number[][],
  rules: RulesOrdered,
  returnOrdered: boolean = true,
) => pages.map((pages) => {
  const orderedPages = pages.reduce((acc, curr) => {
    const rule = rules[curr];

    if (!rule || !rule.childrens?.length)
      return [ ...acc, curr ];

    const hasChildInAcc = rule.childrens.some(child => acc?.includes(child));

    return !hasChildInAcc
      ? [ ...acc, curr ]
      : acc;
  }, [] as number[]);

  const isOrderCorrect = pages.length === orderedPages?.length;

  return returnOrdered
    ? (isOrderCorrect ? pages : false)
    : (!isOrderCorrect ? pages : false);
}).filter(Boolean);

/**
 * Method to reorder the pages based on the rules.
 * If a page has a children that is already in the list, it will be moved to the correct position.
 * @param pages - The list of pages to reorder
 * @param rules - The list of rules to reorder
 * @returns The reordered pages
 */
export const reorderPages = (
  pages: number[],
  rules: RulesOrdered,
): number[] => pages.reduce<number[]>((acc, curr) => {
  const rule = rules[curr];

  const hasChildrenInAcc = rule?.childrens?.some(child => acc?.includes(child));

  if (hasChildrenInAcc) {
    const getChildIndex = acc.findIndex(child => rule.childrens.includes(child));

    return [
      ...acc.slice(0, getChildIndex),
      curr,
      ...acc.slice(getChildIndex),
    ];
  }

  return [ ...acc, curr ];
}, []);
