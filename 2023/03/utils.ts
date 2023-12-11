import { dir } from "console";
import { isSymbol } from "./constants";

// Check if a char is a number
export const isNumber = (char: string | null): boolean => !isNaN(Number(char));

/**
 * Find special chars in a line
 * @param line The line to check
 * @param index The index of the line
 * @returns An array of objects with the position of the special chars
 */
export const findSpecialChars = (line: string, index: number): Array<{ symbol: string, x: number, y: number }> => line.split("").reduce(
    (acc: Array<{ symbol: string, x: number, y: number }>, char: string, i: number) => isSymbol.test(char)
        ? [
            ...acc,
            { symbol: char, x: index, y: i }
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
 * Check the adjacent value of an symbol
 * If the previous value is a number, check recursively the previous value until it's not a number
 * @param x The x position
 * @param y The y position
 * @param file The file
 * @param direction The direction to check (1 = right, -1 = left)
 * @returns The adjacent value
 */
export const checkAdjacentValue = (x: number, y: number, file: string[], direction: number): string => {
    const adjacentValue = getValue(x, y + direction, file);

    if (direction === 1) return adjacentValue && adjacentValue.match(/\d/)
        ? `${adjacentValue}${checkAdjacentValue(x, y + direction, file, direction)}`
        : "";
    
    if (direction === -1) return adjacentValue && adjacentValue.match(/\d/)
        ? `${checkAdjacentValue(x, y + direction, file, direction)}${adjacentValue}`
        : "";

    return "";
}

/**
 * Check the left corners of a symbol
 * @param position1 The position of the symbol
 * @param position2 The position of the symbol
 * @param x The x position
 * @param y The y position
 * @param file The file
 * @param direction The direction to check (1 = right, -1 = left)
 * @returns The value of the left corner and all numbers before it
 */
export const checkLeftCorners = (
    position1: string | null,
    position2: string | null,
    x: number,
    y: number,
    file: string[],
    direction: number
): number => isNumber(position1) && !isNumber(position2)
    ? parseInt(checkAdjacentValue(x, y, file, direction))
    : 0;

/**
 * Check right corners of a symbol 
 * @param positionLeft The left position of the symbol
 * @param positionMiddle The top position of the symbol
 * @param positionRight The right position of the symbol
 * @param x The x position
 * @param y The y position
 * @param file The file
 * @returns The value of the right corner and all numbers after / before it
 */
export const checkRightCorners = (
    positionLeft: string | null,
    positionMiddle: string | null,
    positionRight: string | null,
    x: number,
    y: number,
    file: string[]
): number => {
    if (isNumber(positionRight)) {
        const nextValue = checkAdjacentValue(x, y, file, 1);

        if (isNumber(positionMiddle)) {
            if (isNumber(positionLeft)) {
                const previousValue = checkAdjacentValue(x, y, file, -1);
                return parseInt(`${previousValue}${positionMiddle}${nextValue}`);
            } else return parseInt(`${positionMiddle}${nextValue}`);
        } else return parseInt(`${nextValue}`);
    }
    return 0;
}

/**
 * Check the horizontal adjacent values of a symbol
 * @param position The position of the symbol
 * @param x The x position
 * @param y The y position
 * @param file The file
 * @param direction The direction to check (1 = right, -1 = left)
 * @returns The value of the horizontal adjacent values
 */
export const checkHorizontalAdjacentValues = (
    position: string | null,
    x: number,
    y: number,
    file: string[],
    direction: number
): number => isNumber(position)
    ? parseInt(checkAdjacentValue(x, y, file, direction)) 
    : 0;

/**
 * Check vertical values of a symbol
 * @param positionLeft The position of the symbol
 * @param positionMiddle The position of the symbol
 * @param positionRight The position of the symbol
 * @param x The x position
 * @param y The y position
 * @param file The file
 * @param direction The direction to check (1 = right, -1 = left)
 * @returns The value of the vertical values, and all numbers before it
 */
export const checkVerticalValues = (
    positionLeft: string | null,
    positionMiddle: string | null,
    positionRight: string | null,
    x: number,
    y: number,
    file: string[],
    direction: number
): number => {
    if (isNumber(positionMiddle) && !isNumber(positionRight)) {
        const previousValue = isNumber(positionLeft) 
            ? checkAdjacentValue(x, y, file, direction)
            : "";

        return parseInt(`${previousValue}${positionMiddle}`);
    }
    return 0;
}

/**
 * Get all the values around a symbol
 * @param x The x position of the symbol
 * @param y The y position of the symbol
 * @param file The file
 * @returns An array of numbers around the symbol
 */
export const getAllValuesAroundSymbol = (x: number, y: number, file: string[]): number[] => {
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

    // We check each case to get the value of the numbers around the symbol, and sum them
    return [
        checkLeftCorners(positionsToCheck.topLeft, positionsToCheck.top, x - 1, y, file, -1),
        checkVerticalValues(positionsToCheck.topLeft, positionsToCheck.top, positionsToCheck.topRight, x - 1, y, file, -1),
        checkRightCorners(positionsToCheck.topLeft, positionsToCheck.top, positionsToCheck.topRight, x - 1, y, file),
        checkLeftCorners(positionsToCheck.bottomLeft, positionsToCheck.bottom, x + 1, y, file, -1),
        checkVerticalValues(positionsToCheck.bottomLeft, positionsToCheck.bottom, positionsToCheck.bottomRight, x + 1, y, file, -1),
        checkRightCorners(positionsToCheck.bottomLeft, positionsToCheck.bottom, positionsToCheck.bottomRight, x + 1, y, file),
        checkHorizontalAdjacentValues(positionsToCheck.left, x, y, file, -1),
        checkHorizontalAdjacentValues(positionsToCheck.right, x, y, file, 1),
    ].filter(Boolean);
};

/**
 * Sum the numbers around a symbol
 * @param x The x position of the symbol
 * @param y The y position of the symbol
 * @param file The file
 * @returns The sum of the numbers around the symbol
 */
export const sumNumbersNextToSymbols = (x: number, y: number, file: string[]): number=> {
    const result = getAllValuesAroundSymbol(x, y, file);

    return result.reduce((sum: number, value: number) => sum + value, 0);
};

/**
 * Multiply the 2 numbers around "*" symbol. If there are more than 2 numbers, return 0
 * @param x The x position of the symbol
 * @param y The y position of the symbol
 * @param file The file
 * @returns The multiply result of the numbers around the symbol
 */
export const multiplyNumbersNextToSymbols = (x: number, y: number, file: string[]): number => {
    const result = getAllValuesAroundSymbol(x, y, file);
    
    return result.length === 2 
        ? result.reduce((acc: number, value: number) => acc * value, 1)
        : 0;
}