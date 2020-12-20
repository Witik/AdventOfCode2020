const fs = require("fs");

const buffer = fs.readFileSync('../input/day11');
const layout = buffer.toString().split('\n').filter(line => line !== '')
    .map(line => line.split(''))

const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';
const FLOOR = '.';

const clone = (object) => JSON.parse(JSON.stringify(object));
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const print = (layout) => {
    for (const row of layout) {
        let line = '';
        for (const seat of row) {
            line += seat + ' ';
        }
        console.log(line);
    }
}

const numOccupied = (x, y, layout) => {
    const h = layout.length;
    const w = layout[x].length;
    let occupied = 0;
    for (let i = -1; i <= 1; i++) {
        const xMod = x + i;
        if (xMod < 0 || xMod === h) continue;
        for (let j = -1; j <= 1; j++) {
            const yMod = y + j;
            if (yMod < 0 || yMod === w) continue;
            if (j === i && j === 0) continue;
            if (layout[xMod][yMod] === OCCUPIED_SEAT) {
                occupied++;
            }
        }
    }
    return occupied;
}

const lookDirection = (x, y, layout, xDir, yDir) => {
    const h = layout.length;
    const w = layout[x].length;
    let xMod = x + xDir;
    let yMod = y + yDir;
    while (true) {
        if (xMod < 0 || xMod === h) return false;
        if (yMod < 0 || yMod === w) return false;
        if (layout[xMod][yMod] === OCCUPIED_SEAT) return true;
        if (layout[xMod][yMod] === EMPTY_SEAT) return false;
        xMod += xDir;
        yMod += yDir;
    }
}

const seeOccupied = (x, y, layout) => {
    let occupied = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (j === i && j === 0) continue;
            if (lookDirection(x, y, layout, i, j)) {
                occupied++;
            }
        }
    }
    return occupied;
}

const next = (layout) => {
    const newLayout = clone(layout);

    for (let x = 0; x < layout.length; x++) {
        for (let y = 0; y < layout[x].length; y++) {
            let space = layout[x][y];
            if (space === FLOOR) continue;
            const occupiedAround = numOccupied(x, y, layout);
            if (space === EMPTY_SEAT && occupiedAround === 0) {
                newLayout[x][y] = OCCUPIED_SEAT;
            } else if (space === OCCUPIED_SEAT && occupiedAround >= 4) {
                newLayout[x][y] = EMPTY_SEAT;
            }
        }
    }

    return newLayout;
}

const next2 = (layout) => {
    const newLayout = clone(layout);

    for (let x = 0; x < layout.length; x++) {
        for (let y = 0; y < layout[x].length; y++) {
            let space = layout[x][y];
            if (space === FLOOR) continue;
            const occupiedAround = seeOccupied(x, y, layout);
            if (space === EMPTY_SEAT && occupiedAround === 0) {
                newLayout[x][y] = OCCUPIED_SEAT;
            } else if (space === OCCUPIED_SEAT && occupiedAround >= 5) {
                newLayout[x][y] = EMPTY_SEAT;
            }
        }
    }

    return newLayout;
}

const countOccupied = (layout) => {
    let occupied = 0;
    for (const row of layout) {
        for (const seat of row) {
            if (seat === OCCUPIED_SEAT) {
                occupied++;
            }
        }
    }
    return occupied;
}

(() => {
    console.log('part 1');
    let previousLayout = layout;
    let newLayout = next(layout);
    while (!equals(previousLayout, newLayout)) {
        previousLayout = newLayout;
        newLayout = next(previousLayout);
    }
    console.log(countOccupied(newLayout))
})();


(() => {
    console.log('part 2');
    let previousLayout = layout;
    let newLayout = next2(layout);
    while (!equals(previousLayout, newLayout)) {
        previousLayout = newLayout;
        newLayout = next2(previousLayout);
    }
    console.log(countOccupied(newLayout))
})();
