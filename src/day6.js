const fs = require("fs");

let buffer = fs.readFileSync('../input/day6');
const rawGroups = buffer.toString().split('\n\n')

const groups = rawGroups.map(rawGroup => {
    return rawGroup.split('\n').filter(line => line !== '').map(person => person.split(''))
});

const part1 = () => {
    console.log('part 1');
    let totalYes = 0;
    for (const group of groups) {
        const answers = {};
        group.forEach(person => person.forEach(answer => answers[answer] = true))
        totalYes += Object.keys(answers).length;
    }
    console.log(totalYes);
}

part1();

const part2 = () => {
    console.log('part 2');
    let totalYes = 0;
    for (const group of groups) {
        const answers = {};
        for (const answer of group[0]) {
            let allTrue = true;
            for (let i = 1; i < group.length; i++) {
                const otherAnswers = group[i];
                if (!otherAnswers.includes(answer)) {
                    allTrue = false;
                    break;
                }
            }
            if (allTrue) {
                answers[answer] = true;
            }
        }
        totalYes += Object.keys(answers).length;
    }
    console.log(totalYes);
}

part2();
