import { isSymbol } from "./constants";

// Check if a char is a number
export const isNumber = (char: string | null): boolean => !isNaN(Number(char));

/**
 * Find special chars in a line
 * @param line The line to check
 * @param index The index of the line
 * @returns An array of objects with the position of the special chars
 */
export const findSpecialChars = (line: string, index: number): Array<{ [key: string]: number }> => line.split("").reduce(
    (acc: Array<{ x: number, y: number }>, char: string, i: number) => isSymbol.test(char)
        ? [
            ...acc,
            { x: index, y: i }
        ]
        : acc
    ,[]
);

/**
 * Get the value of a position in the file
 * @param x The x position
 * @param y The y position
 * @param file The file
 * @returns The value of the position or null if the position is out of the file
 */
export const getValue = (x: number, y: number, file: string[]) => x >= 0 
    && x < file.length 
    && y >= 0 
    && y < file[x].length
        ? file[x][y]
        : null;

/**
 * Check the previous value of a position
 * If the previous value is a number, check recursively the previous value until it's not a number
 * @param x The x position
 * @param y The y position
 * @param file The file
 * @returns The previous value
 */
export const checkPreviousValue = (x: number, y: number, file: string[]): string => {
    const previousValue = getValue(x, y - 1, file);

    return previousValue && previousValue.match(/\d/) 
        ? `${checkPreviousValue(x, y - 1, file)}${previousValue}`
        : "";
}

/**
 * Check the next value of a position
 * If the next value is a number, check recursively the next value until it's not a number
 * @param x The x position
 * @param y The y position
 * @param file The file
 * @returns The next value
 */
export const checkNextValue = (x: number, y: number, file: string[]): string => {
    const nextValue = getValue(x, y + 1, file);

    return nextValue && nextValue.match(/\d/) 
        ? `${nextValue}${checkNextValue(x, y + 1, file)}`
        : "";
}

/**
 * Sum the numbers around a symbol
 * @param x The x position of the symbol
 * @param y The y position of the symbol
 * @param file The file
 * @returns The sum of the numbers around the symbol
 */
export const sumNumbersNextToSymbols = (x: number, y: number, file: string[]): number=> {
    // Get the value of each char around the symbol
    const positionsToCheck = {
        topLeft: getValue(x - 1, y - 1, file),
        top: getValue(x - 1, y, file),
        topRight: getValue(x - 1, y + 1, file),
        left: getValue(x, y - 1, file),
        right: getValue(x, y + 1, file),
        bottomLeft: getValue(x + 1, y - 1, file),
        bottom: getValue(x + 1, y, file),
        bottomRight: getValue(x + 1, y + 1, file),
    }

    const result = [];

    if (isNumber(positionsToCheck.topLeft) && !isNumber(positionsToCheck.top)) {
        const previousValue = checkPreviousValue(x - 1, y, file);
        result.push(parseInt(`${previousValue}`));
    }


    if (isNumber(positionsToCheck.top) && !isNumber(positionsToCheck.topRight)) {
        const previousValue = isNumber(positionsToCheck.topLeft) 
            ? checkPreviousValue(x - 1, y, file)
            : "";
        result.push(parseInt(`${previousValue}${positionsToCheck.top}`));
    }

    if (isNumber(positionsToCheck.topRight)) {
        const nextValue = checkNextValue(x - 1, y, file);

        if (isNumber(positionsToCheck.top)) {
            if (isNumber(positionsToCheck.topLeft)) {
                const previousValue = checkPreviousValue(x - 1, y, file);
                result.push(parseInt(`${previousValue}${positionsToCheck.top}${nextValue}`));
            } else {
                result.push(parseInt(`${positionsToCheck.top}${nextValue}`));
            }
        } else {
            result.push(parseInt(`${nextValue}`));
        }
    }

    if (isNumber(positionsToCheck.bottomLeft) && !isNumber(positionsToCheck.bottom)) {
        const previousValue = checkPreviousValue(x + 1, y, file);
        result.push(parseInt(`${previousValue}`));
    }

    if (isNumber(positionsToCheck.bottom) && !isNumber(positionsToCheck.bottomRight)) {
        const previousValue = isNumber(positionsToCheck.bottomLeft) 
            ? checkPreviousValue(x + 1, y, file)
            : "";
        result.push(parseInt(`${previousValue}${positionsToCheck.bottom}`));
    }

    if (isNumber(positionsToCheck.bottomRight)) {
        const nextValue = checkNextValue(x + 1, y, file);

        if (isNumber(positionsToCheck.bottom)) {
            if (isNumber(positionsToCheck.bottomLeft)) {
                const previousValue = checkPreviousValue(x + 1, y, file);
                result.push(parseInt(`${previousValue}${positionsToCheck.bottom}${nextValue}`));
            } else {
                result.push(parseInt(`${positionsToCheck.bottom}${nextValue}`));
            }
        } else {
            result.push(parseInt(`${nextValue}`));
        }
    }

    if (isNumber(positionsToCheck.left)) {
        const previousValue = checkPreviousValue(x, y, file);
        result.push(parseInt(`${previousValue}`));
    }

    if (isNumber(positionsToCheck.right)) {
        const nextValue = checkNextValue(x, y, file);
        result.push(parseInt(`${nextValue}`));
    }

    return result.reduce((sum: number, value: number) => sum + value, 0);
};