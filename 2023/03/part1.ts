import { findSpecialChars, sumNumbersNextToSymbols } from "./utils";

const part1 = (file: string[]): number => {
    const symbolsPosition = file.reduce(
        (
            acc: Array<{ [key: string]: number }>,
            line: string,
            index: number
        ) => [ ...acc, ...findSpecialChars(line, index) ], []
    );
    
    return symbolsPosition.reduce(
        (acc: number, symbol: { [key: string]: number }) => acc + sumNumbersNextToSymbols(symbol.x, symbol.y, file), 0
    );
};

export default part1;