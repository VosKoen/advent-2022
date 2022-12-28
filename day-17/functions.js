"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runB = exports.runA = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runA() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const jets = inputArray[0].split("");
        const columns = [[0], [0], [0], [0], [0], [0], [0]];
        for (let i = 0; i < 1000000000000; i++) {
            if (i % 1000000000 === 0) {
                console.log(i);
            }
            if (i % 5 === 0) {
                dropRock(columns, rock1, jets);
            }
            if (i % 5 === 1) {
                dropRock(columns, rock2, jets);
            }
            if (i % 5 === 2) {
                dropRock(columns, rock3, jets);
            }
            if (i % 5 === 3) {
                dropRock(columns, rock4, jets);
            }
            if (i % 5 === 4) {
                dropRock(columns, rock5, jets);
            }
        }
        console.log(determineHeight(columns));
        // console.log(columns.map(column => column.filter(value => value < 30)));
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
    });
}
exports.runB = runB;
// Rocks defined by coordinates from intersection leftmost and bottommost edges
const rock1 = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
];
const rock2 = [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
];
const rock3 = [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
];
const rock4 = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
];
const rock5 = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
];
function dropRock(columns, rock, jets) {
    const dropHeight = determineHeight(columns) + 4;
    const initialLocation = rock.map((rockPart) => [
        rockPart[0] + 2,
        rockPart[1] + dropHeight,
    ]);
    processFall(columns, initialLocation, jets);
}
function determineHeight(columns) {
    return Math.max(...columns.map((column) => Math.max(...column)));
}
function processFall(columns, rock, jets) {
    const currentJet = jets.splice(0, 1)[0];
    const rockAfterJet = processJet(currentJet, columns, rock);
    jets.push(currentJet);
    const canDrop = rockAfterJet.filter((rockPart) => columns[rockPart[0]].includes(rockPart[1] - 1)).length === 0;
    if (canDrop) {
        const rockAfterDrop = rockAfterJet.map((rockPart) => [
            rockPart[0],
            rockPart[1] - 1,
        ]);
        processFall(columns, rockAfterDrop, jets);
    }
    else {
        rockAfterJet.forEach((rockPart) => columns[rockPart[0]].push(rockPart[1]));
    }
}
function processJet(jetSymbol, columns, rockLocation) {
    if (jetSymbol === "<") {
        const canMove = rockLocation.filter((rockPart) => rockPart[0] === 0 || columns[rockPart[0] - 1].includes(rockPart[1])).length === 0;
        if (canMove) {
            return rockLocation.map((rockPart) => [rockPart[0] - 1, rockPart[1]]);
        }
        return [...rockLocation];
    }
    if (jetSymbol === ">") {
        const canMove = rockLocation.filter((rockPart) => rockPart[0] === 6 || columns[rockPart[0] + 1].includes(rockPart[1])).length === 0;
        if (canMove) {
            return rockLocation.map((rockPart) => [rockPart[0] + 1, rockPart[1]]);
        }
        return [...rockLocation];
    }
    return [...rockLocation];
}
