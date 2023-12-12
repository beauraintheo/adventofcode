/**
 * @param numbers Winning numbers
 * @param currentDraft Current draft
 * @returns Sum of winning numbers. First number is worth 1 point, and each other number multiply current score by 2
 */
export const sumWinningNumbers = (numbers: string[], currentDraft: string[]): number => {
    const winningNumbers = numbers.filter(Boolean).filter((number) => currentDraft.includes(number));
    return winningNumbers.length <= 1 
        ? winningNumbers.length 
        : 2 ** (winningNumbers.length - 1);
}