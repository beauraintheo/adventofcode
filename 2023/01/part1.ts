import { isNumber } from "../utils/regex";

const part1 = (file: string[]): number => file.reduce(
    (acc: number, line: string) => {
        const getNumbers = line.split("").map(
            (char: string) => isNumber.test(char) ? char : null
        ).filter(Boolean);
            
        const currentNumber = getNumbers && getNumbers.length === 1 
            ? getNumbers[0]?.repeat(2)
            : `${getNumbers[0]}${getNumbers[getNumbers.length - 1]}`;

        return acc + (currentNumber ? Number(currentNumber) : 0);
    }
, 0);

export default part1;