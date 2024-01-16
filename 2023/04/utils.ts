/**
 * Method to get winning numbers from a scratchcard
 * @param numbers Winning numbers
 * @param currentDraft Current draft
 * @returns Winning numbers
 */
export const getWinningNumbers = (
	numbers: string[],
	currentScratchcard: string[]
): string[] => numbers.filter(Boolean).filter((number) => currentScratchcard.includes(number));

/**
 * Method to sum of all winning numbers from a scratchcard
 * @param numbers Winning numbers
 * @param currentDraft Current draft
 * @returns Sum of winning numbers. First number is worth 1 point, and each other number multiply current score by 2
 */
export const sumWinningNumbers = (numbers: string[], currentScratchcard: string[]): number => {
	const winningNumbers = getWinningNumbers(numbers, currentScratchcard);

	return winningNumbers.length <= 1
		? winningNumbers.length
		: 2 ** (winningNumbers.length - 1);
};