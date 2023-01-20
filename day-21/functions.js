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
        const parsedInput = inputArray.map((monkey) => {
            const splitMonkey = monkey.split(": ");
            const value = /\d/.test(splitMonkey[1])
                ? parseInt(splitMonkey[1], 10)
                : splitMonkey[1];
            return {
                name: splitMonkey[0],
                value,
            };
        });
        const root = parsedInput.find((monkey) => monkey.name === "root");
        root.value = root.value.replace('+', '-');
        while (root && typeof root.value === "string") {
            parsedInput.forEach((monkey) => processMonkey(monkey, parsedInput));
        }
        console.log(parsedInput.find((monkey) => monkey.name === "root"));
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const parsedInput = inputArray.map((monkey) => {
            const splitMonkey = monkey.split(": ");
            const value = /\d/.test(splitMonkey[1])
                ? parseInt(splitMonkey[1], 10)
                : splitMonkey[1];
            return {
                name: splitMonkey[0],
                value,
            };
        });
        const root = parsedInput.find((monkey) => monkey.name === "root");
        root.value = root.value.replace('+', '-');
        let variables = ["humn"];
        const humn = parsedInput.find((monkey) => monkey.name === "humn");
        humn.value = "x";
        while (!variables.includes('root')) {
            parsedInput.forEach((monkey) => processMonkeyB(monkey, variables, parsedInput));
        }
        if (typeof root.value === 'string') {
            for (let i = 0; i <= 999999; i++) {
                if (i % 1000 === 0) {
                    console.log(i);
                }
                const test = root.value.replace('x', (i * 10000000).toString(10));
                if (eval(test) < 0) {
                    for (let j = 0; j <= 10000000; j++) {
                        const test = root.value.replace('x', ((i - 1) * 10000000 + j).toString(10));
                        if (j % 1000 === 0) {
                            console.log(j, eval(test));
                        }
                        if (eval(test) === 0) {
                            console.log((i - 1) * 10000000 + j);
                            break;
                        }
                    }
                    break;
                }
            }
        }
    });
}
exports.runB = runB;
function processMonkey(monkey, allMonkeys) {
    if (typeof monkey.value === "number") {
        return;
    }
    const monkeyValueSplit = monkey.value.split(" ");
    const monkey1 = allMonkeys.find((haystackMonkey) => haystackMonkey.name === monkeyValueSplit[0]);
    const monkey2 = allMonkeys.find((haystackMonkey) => haystackMonkey.name === monkeyValueSplit[2]);
    if (typeof monkey1.value === "number" && typeof monkey2.value === "number") {
        monkey.value = parseInt(eval(`${monkey1.value} ${monkeyValueSplit[1]} ${monkey2.value}`), 10);
    }
}
function processMonkeyB(monkey, variables, allMonkeys) {
    if (typeof monkey.value === "number" || typeof monkey.value === "boolean") {
        return variables;
    }
    if (variables.includes(monkey.name)) {
        return variables;
    }
    const monkeyValues = monkey.value.match(/([A-Z,a-z]{4})/g);
    if (monkeyValues === null) {
        variables.push(monkey.name);
        return variables;
    }
    monkeyValues.forEach(monkeyToReplace => {
        const monkeyFound = allMonkeys.find(monkeyToFind => monkeyToFind.name === monkeyToReplace);
        if (typeof monkey.value === 'string' && monkeyFound) {
            monkey.value = monkey.value.replace(monkeyToReplace, `(${monkeyFound.value.toString()})`);
        }
    });
    return variables;
}
