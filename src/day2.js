const fs = require("fs");

let buffer = fs.readFileSync('../input/day2');
const rawLines = buffer.toString().split('\n')
rawLines.pop(); // remove the last element, as it is empty

// const rawLines = [
//     '1-3 a: abcde',
//     '1-3 b: cdefg',
//     '2-9 c: ccccccccc',
// ]
const lines = rawLines.map(line => {
    const [policy, character, password] = line.split(' ');
    const [one, two] = policy.split('-');
    return {
        range: {
            min: +one,
            max: +two,
        },
        contains: {
            one: +one,
            two: +two,
        },
        character: character.charAt(0),
        password
    }
});

const part1 = () => {
    console.log('part 1');
    let numValid = 0;
    for (const line of lines) {
        const replaced = line.password.replace(new RegExp(line.character, 'g'), '');
        const amount = line.password.length - replaced.length;

        if(amount >= line.range.min && amount <= line.range.max) {
            numValid++;
        }
    }
    console.log(numValid);
}

part1();

const part2 = () => {
    console.log('part 2');
    let numValid = 0;
    for (const line of lines) {
        let one = line.password.charAt(line.contains.one - 1);
        let two = line.password.charAt(line.contains.two - 1);
        if((one === line.character || two === line.character) && one !== two) {
            numValid++;
        }
    }
    console.log(numValid);
}

part2();
