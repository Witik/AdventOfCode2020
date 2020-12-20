const fs = require("fs");

let buffer = fs.readFileSync('../input/day9');
const rawNumbers = buffer.toString().split('\n').filter(line => line !== '')

const numbers = rawNumbers.map((raw) => +raw);

const SIZE = 25;

const valid = (num, preamble) => {
    for (let i = 0; i < preamble.length - 1; i++) {
        const num1 = preamble[i];
        for (let j = (i + 1); j < preamble.length; j++) {
            const num2 = preamble[j]
            if (num1 + num2 === num) {
                return true;
            }
        }
    }
    return false;
}

let invalidNumber;
(() => {
    console.log('part 1');
    for (let i = SIZE; i <numbers.length; i++) {
        const preamble = numbers.slice(i - SIZE, i);
        if (!valid(numbers[i], preamble)) {
            invalidNumber = numbers[i];
            break;
        }
    }
    console.log(invalidNumber);
})();

const sum = (list) => list.reduce((a, b) => a+b, 0);
const min = (list) => list.reduce((a, b) => Math.min(a,b), Number.MAX_VALUE);
const max = (list) => list.reduce((a, b) => Math.max(a,b), Number.MIN_VALUE);

(() => {
    console.log('part 2');
    const list = [];
    for (const number of numbers) {
        while(sum(list) > invalidNumber) {
            list.splice(0, 1);
        }
        if (sum(list) === invalidNumber) {
            break;
        }
        list.push(number);
    }
    console.log(min(list), max(list), min(list) + max(list))


})();
