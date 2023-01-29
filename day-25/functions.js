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
        const decimals = inputArray.map(snafuToDecimal);
        console.log(decimals);
        const totalDecimal = decimals.reduce((acc, val) => acc + val);
        console.log(totalDecimal);
        console.log(decimalToSnafu(totalDecimal));
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
    });
}
exports.runB = runB;
function snafuToDecimal(snafu) {
    const snafuArray = snafu.split("").map((char) => {
        if (char === "=") {
            return -2;
        }
        if (char === "-") {
            return -1;
        }
        return parseInt(char, 10);
    });
    return [...snafuArray]
        .reverse()
        .map((snafuNumber, index) => snafuNumber * Math.pow(5, index))
        .reduce((acc, val) => acc + val);
}
const decimalToSnafuMap = new Array(25)
    .fill(0)
    .map((value, index) => Math.pow(5, index));
function decimalToSnafu(decimal) {
    console.log(decimalToSnafuMap);
    const snafuBase = decimalToSnafuMap.filter((value) => value / 2 < decimal);
    const snafuString = [];
    let remainder = decimal;
    [...snafuBase].reverse().forEach((base) => {
        if (Math.abs(remainder) < base / 2) {
            snafuString.push("0");
            return;
        }
        if (remainder > base / 2 && remainder < (base * 3) / 2) {
            snafuString.push("1");
            remainder -= base;
            return;
        }
        if (remainder < -base / 2 && remainder > (-base * 3) / 2) {
            snafuString.push("-");
            remainder += base;
            return;
        }
        if (remainder > (base * 3) / 2) {
            snafuString.push("2");
            remainder -= 2 * base;
            return;
        }
        if (remainder < (-base * 3) / 2) {
            snafuString.push("=");
            remainder += 2 * base;
            return;
        }
    });
    return snafuString.join("");
}
