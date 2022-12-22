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
const numberRegex = /\d+/;
function runA() {
    return __awaiter(this, void 0, void 0, function* () {
        let count = 1;
        const indicesRightOrder = [];
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const parsedInput = inputArray
            .map((line) => parseLine(line));
        parsedInput.forEach((line, index) => {
            if (index % 3 === 0) {
                const result = isInRightOrder(parsedInput[index], parsedInput[index + 1]);
                if (result) {
                    indicesRightOrder.push(count);
                }
                count++;
            }
        });
        console.log(indicesRightOrder.reduce((acc, val) => acc + val));
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const divider1 = [[6]];
        const divider2 = [[2]];
        const parsedInput = [];
        inputArray
            .forEach((line) => {
            if (line !== '') {
                parsedInput.push(parseLine(line));
            }
        });
        parsedInput.push(divider1);
        parsedInput.push(divider2);
        parsedInput.sort((a, b) => isInRightOrder(a, b) ? -1 : 1);
        const indexDivider1 = parsedInput.findIndex((entry) => divider1 === entry);
        const indexDivider2 = parsedInput.findIndex((entry) => divider2 === entry);
        console.log((indexDivider1 + 1) * (indexDivider2 + 1));
    });
}
exports.runB = runB;
function parseLine(line) {
    let numberString = "";
    const nestedArrays = [[]];
    let arrayCounter = 0;
    let arraySelector = 0;
    let arraySelectorStack = [];
    for (let i = 0; i <= line.length - 1; i++) {
        const character = line.substring(i, i + 1);
        if (numberRegex.test(character)) {
            numberString += character;
        }
        else if (numberString !== "") {
            // @ts-ignore
            nestedArrays[arraySelector].push(parseInt(numberString, 10));
            numberString = "";
        }
        if (character === "[") {
            arrayCounter++;
            arraySelectorStack.push(arraySelector);
            arraySelector = arrayCounter;
            nestedArrays.push([]);
            // @ts-ignore
            nestedArrays[arraySelectorStack[arraySelectorStack.length - 1]].push(nestedArrays[arraySelector]);
        }
        if (character === "]") {
            arraySelector = arraySelectorStack.pop();
        }
    }
    if (numberString !== "") {
        // @ts-ignore
        nestedArrays[selector].push(parseInt(numberString, 10));
    }
    return nestedArrays[0];
}
function isInRightOrder(valueA, valueB) {
    if (typeof valueA === "number" && typeof valueB === "number") {
        return isRightOrderInteger(valueA, valueB);
    }
    if (Array.isArray(valueA) && Array.isArray(valueB)) {
        return isRightOrderArray(valueA, valueB);
    }
    if ((typeof valueA === "number" && typeof valueB !== "number") ||
        (typeof valueA !== "number" && typeof valueB === "number")) {
        if (typeof valueA === "number") {
            return isInRightOrder([valueA], valueB);
        }
        else {
            return isInRightOrder(valueA, [valueB]);
        }
    }
    return -1;
}
function isRightOrderInteger(valueA, valueB) {
    if (valueA < valueB) {
        return true;
    }
    if (valueA > valueB) {
        return false;
    }
    return -1;
}
function isRightOrderArray(valueA, valueB) {
    for (let i = 0; i < valueA.length; i++) {
        // If no more right items return false
        if (i === valueB.length) {
            return false;
        }
        const rightOrder = isInRightOrder(valueA[i], valueB[i]);
        if (rightOrder !== -1) {
            return rightOrder;
        }
    }
    // If right still has items return true
    if (valueB.length > valueA.length) {
        return true;
    }
    return -1;
}
//
// function isInRightOrder(valueA: any, valueB: any): boolean | void {
//   if(valueB === undefined) {
//     return false;
//   }
//   if (typeof valueA === "number" && typeof valueB === "number") {
//     if (valueA < valueB) {
//       return true;
//     }
//     if (valueA > valueB) {
//       return false;
//     }
//   } else if (typeof valueA !== "number" && typeof valueB !== "number") {
//     console.log(valueA, valueB);
//     if(valueA.length === 0 && valueB.length > 0) {
//       return true;
//     }
//     for (let i = 0; i <= valueA.length - 1; i++) {
//       if (isInRightOrder(valueA[i], valueB[i])) {
//         return true;
//       }
//       if (isInRightOrder(valueA[i], valueB[i]) === false) {
//         return false;
//       }
//       if (valueB.length - 1 <= i) {
//         return false;
//       }
//       if (i === valueA.length - 1 && valueB.length > valueA.length) {
//         return true;
//       }
//     }
//   } else {
//     if (typeof valueA === "number") {
//       const valueANew = [valueA];
//       return isInRightOrder(valueANew, valueB);
//     }
//     if (typeof valueB === "number") {
//       const valueBNew = [valueB];
//       return isInRightOrder(valueA, valueBNew);
//     }
//   }
// }
