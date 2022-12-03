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
exports.runDay2b = exports.runDay2a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runDay2a() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-2a");
        console.log(inputArray
            .map((move) => calculatePointsForMove(move))
            .reduce((acc, result) => acc + result));
    });
}
exports.runDay2a = runDay2a;
function runDay2b() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-2a");
        console.log(inputArray
            .map((strategy) => convertResultDesireToMove(strategy))
            .map((move) => calculatePointsForMove(move))
            .reduce((acc, result) => acc + result));
    });
}
exports.runDay2b = runDay2b;
function convertResultDesireToMove(strategy) {
    const move = {
        AX: "A Z",
        BX: "B X",
        CX: "C Y",
        AY: "A X",
        BY: "B Y",
        CY: "C Z",
        AZ: "A Y",
        BZ: "B Z",
        CZ: "C X",
    };
    return move[strategy.split(" ").join("")];
}
function calculatePointsForMove(move) {
    const points = {
        AX: 4,
        BX: 1,
        CX: 7,
        AY: 8,
        BY: 5,
        CY: 2,
        AZ: 3,
        BZ: 9,
        CZ: 6,
    };
    return points[move.split(" ").join("")];
}
