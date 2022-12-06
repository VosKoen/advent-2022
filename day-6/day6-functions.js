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
exports.runDay6b = exports.runDay6a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runDay6a() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputString = (yield (0, parseInput_1.default)(__dirname + "/input-6"))[0];
        console.log(findFirstDistinctCharIndex(inputString, 4) + 1);
    });
}
exports.runDay6a = runDay6a;
function runDay6b() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputString = (yield (0, parseInput_1.default)(__dirname + "/input-6"))[0];
        console.log(findFirstDistinctCharIndex(inputString, 14) + 1);
    });
}
exports.runDay6b = runDay6b;
function findFirstDistinctCharIndex(packet, noCharacters) {
    return packet
        .split("")
        .findIndex((element, currentIndex, array) => currentIndex >= noCharacters - 1 && hasUniqueValues(array.slice(currentIndex - noCharacters + 1, currentIndex + 1)));
}
function hasUniqueValues(array) {
    return (array
        .map((element) => array.filter((el) => el === element).length)
        .filter((noOfOccurences) => noOfOccurences !== 1).length === 0);
}
