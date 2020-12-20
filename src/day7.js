const fs = require("fs");

let buffer = fs.readFileSync('../input/day7');
const rawBags = buffer.toString().split('\n').filter(line => line !== '')

const bags = rawBags.reduce((allBags, rawBag) => {
    const containerKind = rawBag.substring(0, rawBag.indexOf(" bags"));
    const contains = rawBag.match(/[0-9]+ [a-z]+\s[a-z]+/g) || [];
    allBags[containerKind] = (allBags[containerKind]||{});
    allBags[containerKind].contains = contains.reduce((acc, cur) => {
        const [, amount, kind] = cur.match(/([0-9]+)\s(.*)/);
        acc[kind] = +amount;
        allBags[kind] = (allBags[kind]||{})
        allBags[kind].containers = [...(allBags[kind].containers || []), containerKind];
        return acc;
    }, {});
    return allBags;
}, {});

const howMany = (kind) => {
    let num = 1;
    for (const bag of Object.keys(bags[kind].contains)) {
        num += bags[kind].contains[bag] * howMany(bag)
    }
    return num;
}

const whichContain = (kind) => {
    const containers = bags[kind].containers;
    if(!containers) {
        return {};
    }
    return containers.reduce((acc, curr) => {
            return {...acc, ...whichContain(curr)};
        }, containers.reduce((acc, curr) => {
            acc[curr] = true;
            return acc;
    }, {}));
}

(() => {
    console.log('part 1');
    console.log(Object.keys(whichContain('shiny gold')).length)
})();

(() => {
    console.log('part 2');
    console.log(howMany('shiny gold') - 1)
})();
