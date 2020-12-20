const fs = require("fs");

let buffer = fs.readFileSync('../input/day10');
const rawNumbers = buffer.toString().split('\n').filter(line => line !== '')

const numbers = rawNumbers.map((raw) => +raw);

const sum = (list) => list.reduce((a, b) => a+b, 0);
const min = (list) => list.reduce((a, b) => Math.min(a,b), Number.MAX_VALUE);
const max = (list) => list.reduce((a, b) => Math.max(a,b), Number.MIN_VALUE);

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
