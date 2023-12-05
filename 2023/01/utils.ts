import { isNumber } from "../utils/regex";

/**
 * Method to get the first number of a string
 * @param line Line to parse
 * @returns First number of the line
 */
const getFirstNumber = (line: string): number => {
    const numbers = line
        .split("")
        .filter((char: string) => isNumber.test(char))
        .map((char: string) => parseInt(char));

    return numbers.length > 0 ? numbers[0] : 0;
};

export default getFirstNumber;