const fs = require("fs");

const buffer = fs.readFileSync('../input/day12');
const actions = buffer.toString().split('\n').filter(line => line !== '')
    .map(line => ({
        direction: line.charAt(0),
        value: +(line.substring(1)),
    }))

const NORTH = 'N';
const SOUTH = 'S';
const EAST = 'E';
const WEST = 'W';
const LEFT = 'L';
const RIGHT = 'R';
const FORWARD = 'F';

const rightAngle = 90;

const startPos = {
    north: 0,
    east: 0,
};
const startRotation = 1;

(() => {
    console.log('part 1');
    let pos = {...startPos};
    let rotation = startRotation;

    for (const action of actions) {
        switch (action.direction) {
            case NORTH:
                pos.north += action.value;
                break;
            case SOUTH:
                pos.north -= action.value;
                break;
            case EAST:
                pos.east += action.value;
                break;
            case WEST:
                pos.east -= action.value;
                break;
            case LEFT:
                rotation -= action.value / rightAngle;
                break;
            case RIGHT:
                rotation += action.value / rightAngle;
                break;
            case FORWARD:
                switch (rotation) {
                    case 0:
                        pos.north += action.value;
                        break;
                    case 1:
                        pos.east += action.value;
                        break;
                    case 2:
                        pos.north -= action.value;
                        break;
                    case 3:
                        pos.east -= action.value;
                        break;
                }
                break;
        }
        rotation = (4 + rotation) % 4;
    }

    console.log(Math.abs(pos.north) + Math.abs(pos.east))
})();

(() => {
    console.log('part 2');
    let pos = {...startPos};
    let waypoint = { east: 10, north: 1};

    for (const action of actions) {
        switch (action.direction) {
            case NORTH:
                waypoint.north += action.value;
                break;
            case SOUTH:
                waypoint.north -= action.value;
                break;
            case EAST:
                waypoint.east += action.value;
                break;
            case WEST:
                waypoint.east -= action.value;
                break;
            case LEFT:
                for (let i = 0; i < (action.value/rightAngle); i++) {
                    waypoint = {
                        east: -waypoint.north,
                        north: waypoint.east,
                    }
                }
                break;
            case RIGHT:
                for (let i = 0; i < (action.value/rightAngle); i++) {
                    waypoint = {
                        east: waypoint.north,
                        north: -waypoint.east,
                    }
                }
                break;
            case FORWARD:
                pos.east += waypoint.east * action.value;
                pos.north += waypoint.north * action.value;
                break;
        }
    }

    console.log(Math.abs(pos.north) + Math.abs(pos.east))
})();
