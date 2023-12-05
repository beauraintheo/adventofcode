import { isNumber } from "../utils/regex";

/**
 * Method to get the first number of a string
 * @param line Line to parse
 * @returns First number of the line
 */
const getFirstNumber = (line: string): number => {
    const firstNumberChar = line
        .split("")
        .find((char: string) => isNumber.test(char))

    return firstNumberChar ? parseInt(firstNumberChar) : 0;
};

export default getFirstNumber;