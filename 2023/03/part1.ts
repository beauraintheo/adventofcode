import { findSpecialChars, sumNumbersNextToSymbols } from "./utils";

const part1 = (file: string[]): number => {
	// Find all special chars in the file
	const symbolsPosition = file.reduce(
		(
			acc: Array<{ symbol: string, x: number, y: number }>,
			line: string,
			index: number
		) => [ ...acc, ...findSpecialChars(line, index) ], []
	);

	// Sum all numbers next to special chars
	return symbolsPosition.reduce(
		(acc: number, symbol: { symbol: string, x: number, y: number }) => acc + sumNumbersNextToSymbols(symbol.x, symbol.y, file), 0
	);
};

export default part1;