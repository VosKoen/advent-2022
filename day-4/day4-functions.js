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
exports.runDay4b = exports.runDay4a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runDay4a() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-4a");
        console.log(inputArray
            .map((line) => line.split(","))
            .map((line) => hasFullyContainedPair(line))
            .filter((contained) => contained).length);
    });
}
exports.runDay4a = runDay4a;
function runDay4b() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-4a");
        console.log(inputArray
            .map((line) => line.split(","))
            .map((line) => haveSomeOverlap(line))
            .filter((contained) => contained).length);
    });
}
exports.runDay4b = runDay4b;
function hasFullyContainedPair(pairs) {
    return (isAContainedByB(pairs[0], pairs[1]) || isAContainedByB(pairs[1], pairs[0]));
}
function isAContainedByB(pairA, pairB) {
    const edgesA = pairA.split("-").map((value) => parseInt(value, 10));
    const edgesB = pairB.split("-").map((value) => parseInt(value, 10));
    return edgesA[0] >= edgesB[0] && edgesA[1] <= edgesB[1];
}
function haveSomeOverlap(pairs) {
    const edgesA = pairs[0].split("-").map((value) => parseInt(value, 10));
    const edgesB = pairs[1].split("-").map((value) => parseInt(value, 10));
    return edgesA[1] >= edgesB[0] && edgesA[0] <= edgesB[1];
}
