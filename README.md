# Advent of Code

Welcome to the Advent of Code project ! This repository contains solutions to the Advent of Code challenges.

## Table of Contents

- [Introduction](#introduction)
- [Structure](#structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Advent of Code is an annual event that takes place in December. Each day, a new programming challenge is released. This repository contains my solutions to these challenges for each year.

## Getting Started

To get started with this project, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/adventofcode.git
cd adventofcode
```

## Structure

Each day's challenge is organized into its own directory.

The project structure is as follows:
A root-level folder for each year released by Advent of Code.
Each year folder contains a directory for each day, with the following files inside:
- index.ts: A launcher for the current project (copied and adapted from another file).
- input.txt: A file containing the input data for the challenge. This can be used to test your solutions or run your own custom tests.
- part1.ts and part2.ts: Solutions for the two parts of the exercise.

## Usage

/!\ You need to be at least on Node 20 to launch the project /!\

To launch an exercise from an specific year / day :
```bash
yarn start <year> <day>
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
