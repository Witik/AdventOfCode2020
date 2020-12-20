const fs = require("fs");

let buffer = fs.readFileSync('../input/day4');
const rawPassports = buffer.toString().split('\n\n')

const passports = rawPassports.map(rawPassport => {
    const passport = {};
    let rawEntries = rawPassport.replace(new RegExp('\n', 'g'), ' ').split(' ').filter(e => e !== '').map(entry => entry.split(':'));
    for (let rawEntry of rawEntries) {
        passport[rawEntry[0]] = rawEntry[1];
    }
    return passport;
});

const validation = {
    byr: (val) => val.length === 4 && (+val >= 1920 && +val <= 2002),
    iyr: (val) => val.length === 4 && (+val >= 2010 && +val <= 2020),
    eyr: (val) => val.length === 4 && (+val >= 2020 && +val <= 2030),
    hgt: (val) => val.endsWith('in')
        ? (+val.slice(0,-2) >= 59 && +val.slice(0,-2) <= 76)
        : val.endsWith('cm')
            ? (+val.slice(0,-2) >= 150 && +val.slice(0,-2) <= 193)
            : false,
    hcl: (val) => val.match(/^#[0-9a-f]{6}$/) != null,
    ecl: (val) => ['amb','blu','brn','gry','grn','hzl','oth'].includes(val),
    pid: (val) => val.match(/^[0-9]{9}$/) != null
}

const part1 = () => {
    console.log('part 1');
    let numValid = 0;
    for (const passport of passports) {
        let valid = true;
        for (const attribute in validation) {
            if(valid && !passport.hasOwnProperty(attribute)) {
                valid = false;
            }
        }
        if(valid) {
            numValid++;
        }
    }
    console.log(numValid);
}

part1();

function validate(passport) {
    for (const attribute in validation) {
        if (!passport.hasOwnProperty(attribute)) {
            return false;
        }
        if(!validation[attribute](passport[attribute])) {
            return false;
        }
    }
    return true;
}

const part2 = () => {
    console.log('part 2');
    let numValid = 0;
    for (const passport of passports) {
        const valid = validate(passport);
        if(valid) {
            numValid++;
        }
    }
    console.log(numValid);
}

part2();
