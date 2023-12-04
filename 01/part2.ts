import { isNumber } from "../utils/regex";

const validDigits: { [key: string]: string } = {
    "one": "o1e",
    "two": "t2o",
    "three": "t3e",
    "four": "f4r",
    "five": "f5e",
    "six": "s6x",
    "seven": "s7n",
    "eight": "e8t",
    "nine": "n9e",
};

const part2 = (file: string[]): number => file.reduce(
    (acc: number, line: string) => {
        const stringWithNumbers1 = line.replace(/one|two|three|four|five|six|seven|eight|nine/gi, (match: string) => String(validDigits[match]));
        const stringWithNumbers2 = stringWithNumbers1.replace(/one|two|three|four|five|six|seven|eight|nine/gi, (match: string) => String(validDigits[match]));

        const getNumbers = stringWithNumbers2.split("").map(
            (char: string) => isNumber.test(char) ? char : null
        ).filter(Boolean);
            
        const currentNumber = getNumbers && getNumbers.length === 1 
            ? getNumbers[0]?.repeat(2)
            : `${getNumbers[0]}${getNumbers[getNumbers.length - 1]}`;

        return acc + (currentNumber ? Number(currentNumber) : 0);
    }
, 0);

export default part2;