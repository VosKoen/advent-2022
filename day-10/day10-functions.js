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
exports.runDay10b = exports.runDay10a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runDay10a() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-10");
        const resultArray = [1];
        inputArray.forEach((line) => {
            const currentX = resultArray[resultArray.length - 1];
            if (line === "noop") {
                resultArray.push(currentX);
            }
            else {
                resultArray.push(currentX);
                resultArray.push(currentX + parseInt(line.split(" ")[1], 10));
            }
        });
        console.log(resultArray);
        const signals = [
            20 * resultArray[19],
            60 * resultArray[59],
            100 * resultArray[99],
            140 * resultArray[139],
            180 * resultArray[179],
            220 * resultArray[219],
        ];
        console.log(signals.reduce((acc, val) => acc + val));
    });
}
exports.runDay10a = runDay10a;
function runDay10b() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-10");
        const screen = [
            Array(40).fill("."),
            Array(40).fill("."),
            Array(40).fill("."),
            Array(40).fill("."),
            Array(40).fill("."),
            Array(40).fill("."),
        ];
        const cursor = [0, 0];
        let currentX = 1;
        inputArray.forEach((line) => {
            if (line === "noop") {
                if (cursor[1] >= currentX - 1 && cursor[1] <= currentX + 1) {
                    screen[cursor[0]][cursor[1]] = "#";
                }
                else {
                    screen[cursor[0]][cursor[1]] = ".";
                }
                if (cursor[1] !== 39) {
                    cursor[1]++;
                }
                else {
                    cursor[1] = 0;
                    if (cursor[0] !== 5) {
                        cursor[0]++;
                    }
                    else {
                        cursor[0] = 0;
                    }
                }
            }
            else {
                if (cursor[1] >= currentX - 1 && cursor[1] <= currentX + 1) {
                    screen[cursor[0]][cursor[1]] = "#";
                }
                else {
                    screen[cursor[0]][cursor[1]] = ".";
                }
                if (cursor[1] !== 39) {
                    cursor[1]++;
                }
                else {
                    cursor[1] = 0;
                    if (cursor[0] !== 5) {
                        cursor[0]++;
                    }
                    else {
                        cursor[0] = 0;
                    }
                }
                if (cursor[1] >= currentX - 1 && cursor[1] <= currentX + 1) {
                    screen[cursor[0]][cursor[1]] = "#";
                }
                else {
                    screen[cursor[0]][cursor[1]] = ".";
                }
                if (cursor[1] !== 39) {
                    cursor[1]++;
                }
                else {
                    cursor[1] = 0;
                    if (cursor[0] !== 5) {
                        cursor[0]++;
                    }
                    else {
                        cursor[0] = 0;
                    }
                }
                currentX += parseInt(line.split(" ")[1], 10);
            }
        });
        screen.forEach((line) => console.log(line.join("")));
    });
}
exports.runDay10b = runDay10b;
