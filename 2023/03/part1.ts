import { findSpecialChars, sumNumbersNextToSymbols } from "./utils";

const part1 = (file: string[]): number => {
    const symbolsPosition = file.reduce(
        (
            acc: Array<{ symbol: string, x: number, y: number }>,
            line: string,
            index: number
        ) => [ ...acc, ...findSpecialChars(line, index) ], []
    );
    
    return symbolsPosition.reduce(
        (acc: number, symbol: { symbol: string, x: number, y: number }) => acc + sumNumbersNextToSymbols(symbol.x, symbol.y, file), 0
    );
};

export default part1;