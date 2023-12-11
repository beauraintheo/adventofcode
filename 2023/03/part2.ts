import { findSpecialChars, multiplyNumbersNextToSymbols } from "./utils";

const part2 = (file: string[]): number => {
    const symbolsPosition = file.reduce(
        (
            acc: Array<{ symbol: string, x: number, y: number }>,
            line: string,
            index: number
        ) => [ ...acc, ...findSpecialChars(line, index) ], []
    );
    
    return symbolsPosition.reduce(
        (acc: number, symbol: { symbol: string, x: number, y: number }) => 
            symbol.symbol === "*"
                ? acc + multiplyNumbersNextToSymbols(symbol.x, symbol.y, file)
                : acc
        , 0
    );
};

export default part2;