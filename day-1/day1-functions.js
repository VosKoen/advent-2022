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
exports.getTopValuesArray = exports.runDay1b = exports.runDay1a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runDay1a() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-1a");
        console.log(Math.max(...caloriesPerElf(inputArray)));
    });
}
exports.runDay1a = runDay1a;
function runDay1b() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-1a");
        const caloriesDistribution = caloriesPerElf(inputArray);
        console.log(getTopValuesArray(caloriesDistribution, 3).reduce((acc, val) => acc + val, 0));
    });
}
exports.runDay1b = runDay1b;
function caloriesPerElf(inputArray) {
    const caloriesPerElf = [];
    caloriesPerElf.push(inputArray.reduce((accumulator, inputValue) => {
        if (inputValue === "") {
            caloriesPerElf.push(accumulator);
            return 0;
        }
        return accumulator + parseInt(inputValue, 10);
    }, 0));
    return caloriesPerElf;
}
function getTopValuesArray(array, numberOfValues) {
    const topValues = Array(numberOfValues);
    topValues.fill(0);
    array.forEach((value) => {
        const minTopValue = Math.min(...topValues);
        if (value > minTopValue) {
            const index = topValues.findIndex((topValue) => topValue === minTopValue);
            topValues[index] = value;
        }
    });
    return topValues;
}
exports.getTopValuesArray = getTopValuesArray;
