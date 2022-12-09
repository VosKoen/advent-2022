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
exports.runDay9b = exports.runDay9a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runDay9a() {
    return __awaiter(this, void 0, void 0, function* () {
        const moves = yield getMoves();
        const initialPosition = [0, 0];
        let headPosition = initialPosition;
        const tailPositions = [initialPosition];
        moves.forEach(move => {
            let tailPosition;
            for (let i = 0; i < move[1]; i++) {
                [headPosition, tailPosition] = processMove(move[0], headPosition, tailPositions[tailPositions.length - 1]);
                tailPositions.push(tailPosition);
            }
        });
        const resultArray = [];
        tailPositions.forEach(position => {
            if (resultArray.filter(element => element[0] === position[0] && element[1] === position[1]).length === 0) {
                resultArray.push(position);
            }
        });
        console.log(resultArray.length);
    });
}
exports.runDay9a = runDay9a;
function runDay9b() {
    return __awaiter(this, void 0, void 0, function* () {
        const moves = yield getMoves();
        const initialPosition = [0, 0];
        let headPosition = initialPosition;
        let tail1Position = initialPosition;
        let tail2Position = initialPosition;
        let tail3Position = initialPosition;
        let tail4Position = initialPosition;
        let tail5Position = initialPosition;
        let tail6Position = initialPosition;
        let tail7Position = initialPosition;
        let tail8Position = initialPosition;
        const tailPositions = [initialPosition];
        moves.forEach(move => {
            let tail9Position;
            for (let i = 0; i < move[1]; i++) {
                [headPosition, tail1Position] = processMove(move[0], headPosition, tail1Position);
                tail2Position = processTailMove(tail1Position, tail2Position);
                tail3Position = processTailMove(tail2Position, tail3Position);
                tail4Position = processTailMove(tail3Position, tail4Position);
                tail5Position = processTailMove(tail4Position, tail5Position);
                tail6Position = processTailMove(tail5Position, tail6Position);
                tail7Position = processTailMove(tail6Position, tail7Position);
                tail8Position = processTailMove(tail7Position, tail8Position);
                tail9Position = processTailMove(tail8Position, tailPositions[tailPositions.length - 1]);
                tailPositions.push(tail9Position);
            }
        });
        const resultArray = [];
        tailPositions.forEach(position => {
            if (resultArray.filter(element => element[0] === position[0] && element[1] === position[1]).length === 0) {
                resultArray.push(position);
            }
        });
        console.log(resultArray.length);
    });
}
exports.runDay9b = runDay9b;
function getMoves() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-9");
        return inputArray.map((line) => {
            const lineSplit = line.split(" ");
            return [lineSplit[0], parseInt(lineSplit[1], 10)];
        });
    });
}
function processMove(move, oldHeadPosition, oldTailPosition) {
    let newHeadPosition = [0, 0];
    switch (move) {
        case "R":
            newHeadPosition = [oldHeadPosition[0] + 1, oldHeadPosition[1]];
            break;
        case "U":
            newHeadPosition = [oldHeadPosition[0], oldHeadPosition[1] + 1];
            break;
        case "L":
            newHeadPosition = [oldHeadPosition[0] - 1, oldHeadPosition[1]];
            break;
        case "D":
            newHeadPosition = [oldHeadPosition[0], oldHeadPosition[1] - 1];
            break;
    }
    return [newHeadPosition, processTailMove(newHeadPosition, oldTailPosition)];
}
function processTailMove(headPosition, oldTailPosition) {
    const positionalDifference = [headPosition[0] - oldTailPosition[0], headPosition[1] - oldTailPosition[1]];
    const newTailPosition = [...oldTailPosition];
    if (Math.abs(positionalDifference[0]) > 1 || Math.abs(positionalDifference[1]) > 1) {
        newTailPosition[0] += positionalDifference[0] === 0 ? 0 : positionalDifference[0] / Math.abs(positionalDifference[0]);
        newTailPosition[1] += positionalDifference[1] === 0 ? 0 : positionalDifference[1] / Math.abs(positionalDifference[1]);
    }
    return newTailPosition;
}
