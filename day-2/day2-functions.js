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
    const strategyParts = strategy.split(" ");
    const opponentMove = strategyParts[0];
    const resultDesire = strategyParts[1];
    let ownMove;
    switch (opponentMove) {
        case "A":
            switch (resultDesire) {
                case "X":
                    ownMove = "Z";
                    break;
                case "Y":
                    ownMove = "X";
                    break;
                case "Z":
                    ownMove = "Y";
                    break;
            }
            break;
        case "B":
            switch (resultDesire) {
                case "X":
                    ownMove = "X";
                    break;
                case "Y":
                    ownMove = "Y";
                    break;
                case "Z":
                    ownMove = "Z";
                    break;
            }
            break;
        case "C":
            switch (resultDesire) {
                case "X":
                    ownMove = "Y";
                    break;
                case "Y":
                    ownMove = "Z";
                    break;
                case "Z":
                    ownMove = "X";
                    break;
            }
            break;
    }
    return `${opponentMove} ${ownMove}`;
}
function calculatePointsForMove(move) {
    const moves = move.split(" ");
    const opponentMove = moves[0];
    const ownMove = moves[1];
    let pointsOwnMove = 0;
    let pointsResult = 0;
    switch (ownMove) {
        case "X":
            pointsOwnMove = 1;
            switch (opponentMove) {
                case "A":
                    pointsResult = 3;
                    break;
                case "B":
                    pointsResult = 0;
                    break;
                case "C":
                    pointsResult = 6;
                    break;
            }
            break;
        case "Y":
            pointsOwnMove = 2;
            switch (opponentMove) {
                case "A":
                    pointsResult = 6;
                    break;
                case "B":
                    pointsResult = 3;
                    break;
                case "C":
                    pointsResult = 0;
                    break;
            }
            break;
        case "Z":
            pointsOwnMove = 3;
            switch (opponentMove) {
                case "A":
                    pointsResult = 0;
                    break;
                case "B":
                    pointsResult = 6;
                    break;
                case "C":
                    pointsResult = 3;
                    break;
            }
            break;
    }
    return pointsResult + pointsOwnMove;
}
