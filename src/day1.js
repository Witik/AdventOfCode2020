const fs = require("fs");

let buffer = fs.readFileSync('../input/day1');

const lines = buffer.toString().split('\n').map(x => +x);
lines.pop(); // remove the last element, as it is empty

const part1 = () => {
    console.log('part 1')
    for (let i = 1; i < lines.length; i++) {
        let curr = lines[i - 1];
        for (let j = i; j < lines.length; j++) {
            let other = lines[j];
            if (curr + other === 2020) {
                console.log(curr, '*', other, '=', curr * other);
                return;
            }
        }
    }
}
part1();

const part2 = () => {
    console.log('part 2')
    for (let i = 2; i < lines.length; i++) {
        let first = lines[i - 2];
        for (let j = i - 1; j < lines.length; j++) {
            let second = lines[j];
            for (let k = i; k < lines.length; k++) {
                let third = lines[k]
                if (first + second + third === 2020) {
                    console.log(first, '*', second, '*', third, '=', first * second * third);
                    return;
                }
            }
        }
    }
}
part2()
