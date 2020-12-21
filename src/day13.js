const fs = require("fs");

const buffer = fs.readFileSync('../input/day13');
const [startTime, busLines] = buffer.toString().split('\n').filter(line => line !== '')
    .map((line, index) => {
        if (index === 0) {
            return +line;
        } else {
            return line.split(',').filter(ln => ln !== 'x').map(num => +num);
        }
    });

(() => {
    console.log('part 1');
    const nextDepartures = busLines.map(line => Math.ceil(startTime / line) * line);
    const nextDeparture = Math.min.apply(null, nextDepartures);
    const waitTime = nextDeparture - startTime;
    const busLine = busLines[nextDepartures.indexOf(nextDeparture)];
    console.log(waitTime * busLine);
})();
