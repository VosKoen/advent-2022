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
exports.processRoundPartB = exports.processRound = exports.convertInputToMonkeyArray = exports.runB = exports.runA = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
const day1_functions_1 = require("../day-1/day1-functions");
function runA() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const monkeyArray = convertInputToMonkeyArray(inputArray);
        const inspectionCount = Array(monkeyArray.length).fill(0);
        for (let i = 0; i <= 19; i++) {
            processRound(monkeyArray).forEach((count, index) => {
                inspectionCount[index] += count;
            });
        }
        console.log((0, day1_functions_1.getTopValuesArray)(inspectionCount, 2).reduce((acc, val) => acc * val));
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const monkeyArray = convertInputToMonkeyArray(inputArray);
        const inspectionCount = Array(monkeyArray.length).fill(0);
        const testsMultiplied = monkeyArray.map(monkey => monkey.test.number).reduce((acc, val) => acc * val);
        for (let i = 0; i <= 9999; i++) {
            processRoundPartB(monkeyArray, testsMultiplied).forEach((count, index) => {
                inspectionCount[index] += count;
            });
        }
        console.log((0, day1_functions_1.getTopValuesArray)(inspectionCount, 2).reduce((acc, val) => acc * val));
    });
}
exports.runB = runB;
function convertInputToMonkeyArray(input) {
    const monkeyArray = [];
    input.forEach((line, index) => {
        switch (index % 7) {
            case 0:
                monkeyArray.push({
                    startingItems: [],
                    operation: { operand: 0, operator: '+' },
                    test: { number: 0, true: 0, false: 0 }
                });
                break;
            case 1:
                monkeyArray[monkeyArray.length - 1].startingItems = line.trim().substring(16).split(', ').map(string => parseInt(string, 10));
                break;
            case 2:
                const stringArray = line.trim().split(' ');
                monkeyArray[monkeyArray.length - 1].operation.operand = stringArray[5] === 'old' ? 'old' : parseInt(stringArray[5], 10);
                monkeyArray[monkeyArray.length - 1].operation.operator = stringArray[4];
                break;
            case 3:
                monkeyArray[monkeyArray.length - 1].test.number = parseInt(line.trim().split(' ')[3], 10);
                break;
            case 4:
                monkeyArray[monkeyArray.length - 1].test.true = parseInt(line.trim().split(' ')[5], 10);
                break;
            case 5:
                monkeyArray[monkeyArray.length - 1].test.false = parseInt(line.trim().split(' ')[5], 10);
                break;
            default:
                break;
        }
    });
    return monkeyArray;
}
exports.convertInputToMonkeyArray = convertInputToMonkeyArray;
function processRound(monkeyArray) {
    const countPerMonkey = [];
    monkeyArray.forEach((monkey, index) => {
        if (index === 2) {
            console.log(monkey.startingItems);
        }
        countPerMonkey.push(monkey.startingItems.length);
        monkey.startingItems.forEach(item => {
            const operand = (typeof monkey.operation.operand === 'number') ? monkey.operation.operand : item;
            const newLevel = Math.floor((monkey.operation.operator === '+' ? item + operand : item * operand) / 3);
            const newMonkey = newLevel % monkey.test.number === 0 ? monkey.test.true : monkey.test.false;
            monkeyArray[newMonkey].startingItems.push(newLevel);
        });
        monkey.startingItems = [];
    });
    return countPerMonkey;
}
exports.processRound = processRound;
function processRoundPartB(monkeyArray, testsMultiplied) {
    const countPerMonkey = [];
    monkeyArray.forEach((monkey, index) => {
        countPerMonkey.push(monkey.startingItems.length);
        monkey.startingItems.forEach(item => {
            const operand = (typeof monkey.operation.operand === 'number') ? monkey.operation.operand : item;
            const newLevelHigh = (monkey.operation.operator === '+' ? item + operand : item * operand);
            const newLevel = (newLevelHigh > testsMultiplied) ? (newLevelHigh % testsMultiplied) : newLevelHigh;
            const newMonkey = newLevel % monkey.test.number === 0 ? monkey.test.true : monkey.test.false;
            monkeyArray[newMonkey].startingItems.push(newLevel);
        });
        monkey.startingItems = [];
    });
    return countPerMonkey;
}
exports.processRoundPartB = processRoundPartB;
