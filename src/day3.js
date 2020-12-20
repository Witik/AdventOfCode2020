const fs = require("fs");

let buffer = fs.readFileSync('../input/day3');
const rawLines = buffer.toString().split('\n')
rawLines.pop(); // remove the last element, as it is empty

const lines = rawLines.map(line => {
    return line.split('')
        .map(char => char === '#');
});

function countTreesOnSlope(right = 3, down = 1) {
    let numTrees = 0;
    let index = 0;
    let skip = 0;
    for (const line of lines) {
        if(skip > 0) {
            skip--;
            continue;
        }
        if (line[index]) {
            numTrees++;
        }
        index = (index + right) % line.length
        skip = down - 1;
    }
    return numTrees;
}

const part1 = () => {
    console.log('part 1');
    let numTrees = countTreesOnSlope();
    console.log(numTrees);
}

part1();

const part2 = () => {
    console.log('part 2');
    let oneOne = countTreesOnSlope(1);
    console.log(oneOne);
    let threeOne = countTreesOnSlope(3);
    console.log(threeOne);
    let fiveOne = countTreesOnSlope(5);
    console.log(fiveOne);
    let sevenOne = countTreesOnSlope(7);
    console.log(sevenOne);
    let oneTwo = countTreesOnSlope(1, 2);
    console.log(oneTwo);
    console.log(oneOne * threeOne * fiveOne * sevenOne * oneTwo);
}

part2();

