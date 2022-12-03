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
exports.runDay3b = exports.runDay3a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runDay3a() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-3a");
        const result = inputArray
            .map((string) => splitString(string))
            .map((splitString) => findUniqueSharedLetters(splitString[0], splitString[1]));
        console.log(calculateSumPriority(result.join()));
    });
}
exports.runDay3a = runDay3a;
function runDay3b() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-3a");
        const badges = [];
        for (let i = 0; i < inputArray.length / 3; i++) {
            badges.push(findBadgeForGroup(inputArray.slice(3 * i, 3 * i + 3)));
        }
        console.log(calculateSumPriority(badges.join()));
    });
}
exports.runDay3b = runDay3b;
function findBadgeForGroup(group) {
    return group[0]
        .split("")
        .find((character) => group[1].includes(character) && group[2].includes(character));
}
function splitString(toSplit) {
    return [
        toSplit.substring(0, toSplit.length / 2),
        toSplit.substring(toSplit.length / 2),
    ];
}
function findUniqueSharedLetters(string_1, string_2) {
    const shared = string_1
        .split("")
        .filter((character) => string_2.split("").includes(character));
    const unique = [];
    shared.forEach((character) => {
        if (!unique.includes(character)) {
            unique.push(character);
        }
    });
    return unique.join();
}
function calculateSumPriority(items) {
    const itemsSortedByPriority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const priorityArray = itemsSortedByPriority.split("");
    return items
        .split("")
        .map((item) => priorityArray.findIndex((priorityItem) => priorityItem === item) + 1)
        .reduce((acc, val) => acc + val, 0);
}
