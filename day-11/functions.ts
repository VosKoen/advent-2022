import parseInput from "../common/parseInput";
import {getTopValuesArray} from "../day-1/day1-functions";

export async function runA() {
    const inputArray = await parseInput(__dirname + "/input");
    const monkeyArray = convertInputToMonkeyArray(inputArray);
    const inspectionCount = Array(monkeyArray.length).fill(0);
    for (let i = 0; i <= 19; i++) {
        processRound(monkeyArray).forEach((count, index) => {
            inspectionCount[index] += count;
        });
    }
    console.log(getTopValuesArray(inspectionCount, 2).reduce((acc, val) => acc * val));
}

export async function runB() {
    const inputArray = await parseInput(__dirname + "/input");
    const monkeyArray = convertInputToMonkeyArray(inputArray);
    const inspectionCount = Array(monkeyArray.length).fill(0);
    const testsMultiplied = monkeyArray.map(monkey => monkey.test.number).reduce((acc, val) => acc * val);
    for (let i = 0; i <= 9999; i++) {
        processRoundPartB(monkeyArray, testsMultiplied).forEach((count, index) => {
            inspectionCount[index] += count;
        });
    }
    console.log(getTopValuesArray(inspectionCount, 2).reduce((acc, val) => acc * val));
}

export type Monkey = {
    startingItems: number[],
    operation: {
        operand: 'old' | number;
        operator: string;
    };
    test: {
        number: number;
        true: number;
        false: number;
    }
};

export function convertInputToMonkeyArray(input: string[]): Monkey[] {
    const monkeyArray: Monkey[] = [];
    input.forEach((line, index) => {
        switch (index % 7) {
            case 0:
                monkeyArray.push({
                    startingItems: [],
                    operation: {operand: 0, operator: '+'},
                    test: {number: 0, true: 0, false: 0}
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

    })
    return monkeyArray;
}

export function processRound(monkeyArray: Monkey[]): number[] {
    const countPerMonkey: number[] = [];
    monkeyArray.forEach((monkey, index) => {
        if(index === 2) {
            console.log(monkey.startingItems);
        }
        countPerMonkey.push(monkey.startingItems.length);
        monkey.startingItems.forEach(item => {
            const operand = (typeof monkey.operation.operand === 'number') ? monkey.operation.operand : item;
            const newLevel = Math.floor((monkey.operation.operator === '+' ? item + operand : item * operand) / 3);
            const newMonkey = newLevel % monkey.test.number === 0 ? monkey.test.true : monkey.test.false;
            monkeyArray[newMonkey].startingItems.push(newLevel);
        })
        monkey.startingItems = [];
    })
    return countPerMonkey;
}

export function processRoundPartB(monkeyArray: Monkey[], testsMultiplied: number): number[] {
    const countPerMonkey: number[] = [];
    monkeyArray.forEach((monkey, index) => {
        countPerMonkey.push(monkey.startingItems.length);
        monkey.startingItems.forEach(item => {
            const operand = (typeof monkey.operation.operand === 'number') ? monkey.operation.operand : item;
            const newLevelHigh = (monkey.operation.operator === '+' ? item + operand : item * operand);
            const newLevel = (newLevelHigh > testsMultiplied) ? (newLevelHigh % testsMultiplied) : newLevelHigh
            const newMonkey = newLevel % monkey.test.number === 0 ? monkey.test.true : monkey.test.false;
            monkeyArray[newMonkey].startingItems.push(newLevel);
        })
        monkey.startingItems = [];
    })
    return countPerMonkey;
}