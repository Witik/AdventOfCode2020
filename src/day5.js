const fs = require("fs");

let buffer = fs.readFileSync('../input/day5');
const lines = buffer.toString().split('\n').filter(e => e !== '').map(rawLine => {
    return {
        row: rawLine.substring(0, 7),
        column: rawLine.substring(7),
    };
})

const rows = 128;
const columns = 8;

const partition = (value, list) => {
    if (list.length === 0) {
        return 0;
    }
    let half = Math.floor(value / 2);
    return (list[0] ? half : 0) + partition(half, list.slice(1))
}

const processPass = (pass) => {
    const row = partition(rows, pass.row.split('').map(c => c === 'B'));
    const column = partition(columns, pass.column.split('').map(c => c === 'R'));
    const seatId = row * 8 + column;
    return [row, column, seatId]
}

const part1 = () => {
    console.log('part 1');
    let max = 0;
    for (const line of lines) {
        const [, , seatId] = processPass(line);
        max = Math.max(max, seatId)
    }
    console.log(max);
}

part1();

const part2 = () => {
    console.log('part 2');
    const passes = lines.map(processPass).sort((a,b) => a[2] - b[2])
    let lastId = passes[0];
    let missingId = 0;
    for (const [, , seatId] of passes) {
        const missing = seatId - lastId > 1
        if (missing) {
            console.log('missing between', lastId, 'and' ,  seatId);
            missingId = (lastId + seatId) / 2
        }
        lastId = seatId;
    }
    console.log(missingId);
}

part2();
