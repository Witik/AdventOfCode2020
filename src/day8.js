const fs = require("fs");

let buffer = fs.readFileSync('../input/day8');
const rawInstructions = buffer.toString().split('\n').filter(line => line !== '')

const instructions = rawInstructions.map((rawInstruction) => {
    const [op, val] = rawInstruction.split(' ');
    return {
        op,
        arg: +val
    }
})

const runProgram = (program) => {
    const ranInstructions = {};
    let accumulator = 0;
    let pointer = 0;
    while (!ranInstructions[pointer] && program[pointer]) {
        ranInstructions[pointer] = program[pointer];
        const instruction = program[pointer];
        switch (instruction.op) {
            case 'acc':
                accumulator += instruction.arg;
                pointer++;
                break;
            case 'jmp':
                pointer += instruction.arg;
                break;
            case 'nop':
            default:
                pointer++;
                break;
        }
    }
    return [pointer, accumulator, ranInstructions];
}

(() => {
    console.log('part 1');
    const [pointer, accumulator, ranInstructions] = runProgram(instructions);

    console.log(pointer, accumulator, ranInstructions);
})();


function modifyAndRun(ranInstructions) {
    let pointer = 0;
    let accumulator = 0;
    let offset = 0;
    do {
        offset++;
        console.log('attempt',offset)
        const newInstructions = JSON.parse(JSON.stringify(instructions));

        const ranPointers = Object.keys(ranInstructions);

        for (let i = ranPointers.length - offset; i >= 0; i--) {
            let pointer = ranPointers[i];
            let instruction = ranInstructions[pointer];
            if (instruction.op === 'jmp') {
                console.log('modified jmp @', pointer);
                newInstructions[pointer].op = 'nop';
                break;
            }
            if (instruction.op === 'nop') {
                console.log('modified nop @', pointer);
                newInstructions[pointer].op = 'jmp';
                break;
            }
        }

        const [ptr, acc] = runProgram(newInstructions);
        pointer = ptr;
        accumulator = acc;
        console.log(instructions.length, pointer, acc);
    } while (pointer < instructions.length && offset < Object.keys(ranInstructions).length);
    return accumulator;
}

(() => {
    console.log('part 2');
    const [,, ranInstructions] = runProgram(instructions);
    const accumulator = modifyAndRun(ranInstructions);

    console.log(accumulator);
})();
