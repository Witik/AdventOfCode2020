const fs = require("fs");

let buffer = fs.readFileSync('../input/day10');
const rawNumbers = buffer.toString().split('\n').filter(line => line !== '')

const numbers = rawNumbers.map((raw) => +raw);

const min = (list) => list.reduce((a, b) => Math.min(a,b), Number.MAX_VALUE);

(() => {
    console.log('part 1');
    const unused = [...numbers];
    let jolts = 0;
    const differences = {
        1: 0,
        3: 1,
    };

    while (unused.length > 0) {
        const lowest = min(unused);
        unused.splice(unused.indexOf(lowest), 1);
        const difference = lowest - jolts;
        differences[difference] = differences[difference] + 1;
        jolts = lowest;
    }

    console.log(differences, differences[1] * differences[3]);
})();

(() => {
    console.log('part 2');
    const unused = [...numbers];
    let jolts = 0;
    const differences = [];

    while (unused.length > 0) {
        const lowest = min(unused);
        unused.splice(unused.indexOf(lowest), 1);
        const difference = lowest - jolts;
        differences.push(difference);
        jolts = lowest;
    }
    let ones = 0;
    let possibilities = 1;
    for (const difference of differences) {
        if (difference === 1) {
            ones++;
        } else if (ones !== 0) {
            if (ones === 4) {
                possibilities *= 7
            } else if (ones > 1) {
                possibilities *= 2 ** ((ones - 1))
            }
            ones = 0;
        }
    }
    if (ones !== 0) {
        if (ones === 4) {
            possibilities *= 7
        } else if (ones > 1) {
            possibilities *= 2 ** ((ones - 1))
        }
    }

    console.log(possibilities);
})();
