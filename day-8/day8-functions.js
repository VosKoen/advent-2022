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
exports.runDay8b = exports.runDay8a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runDay8a() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-8");
        const forest = inputArray.map((row) => row.split("").map((tree) => parseInt(tree, 10)));
        const visibleTreesGrid = forest.map((treeLine, row) => treeLine.map((tree, column) => isTreeVisible(forest, row, column) ? 1 : 0));
        console.log(visibleTreesGrid);
        console.log(visibleTreesGrid
            .map((treeLine) => treeLine.reduce((acc, val) => acc + val))
            .reduce((acc, val) => acc + val));
    });
}
exports.runDay8a = runDay8a;
function runDay8b() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-8");
        const forest = inputArray.map((row) => row.split("").map((tree) => parseInt(tree, 10)));
        const scenicScoreGrid = forest.map((treeline, row) => treeline.map((tree, column) => calculateScenicScore(forest, row, column)));
        console.log(scenicScoreGrid
            .map((treeLine) => treeLine.reduce((acc, val) => acc < val ? val : acc))
            .reduce((acc, val) => acc < val ? val : acc));
    });
}
exports.runDay8b = runDay8b;
function isTreeVisible(forest, row, column) {
    return (isTreeVisibleInRow(forest, row, column) ||
        isTreeVisibleInColumn(forest, row, column));
}
function isTreeVisibleInRow(forest, row, column) {
    const treeLength = forest[row][column];
    return (forest[row].filter((tree, index) => tree >= treeLength && index < column)
        .length === 0 ||
        forest[row].filter((tree, index) => tree >= treeLength && index > column)
            .length === 0);
}
function isTreeVisibleInColumn(forest, row, column) {
    const treeLength = forest[row][column];
    const rowLines = forest.map((rowLine) => rowLine[column]);
    return (rowLines.filter((tree, index) => tree >= treeLength && index < row)
        .length === 0 ||
        rowLines.filter((tree, index) => tree >= treeLength && index > row)
            .length === 0);
}
function calculateScenicScore(forest, row, column) {
    const rowLines = forest.map((rowLine) => rowLine[column]);
    return (getViewLeft(forest[row], column) *
        getViewLeft(rowLines, row) *
        getViewRight(forest[row], column) *
        getViewRight(rowLines, row));
}
function getViewLeft(treeLine, index) {
    const treeLength = treeLine[index];
    if (index === 0) {
        return 0;
    }
    let score = 0;
    for (let i = index - 1; i >= 0; i--) {
        score++;
        if (treeLine[i] >= treeLength) {
            return score;
        }
    }
    return score;
}
function getViewRight(treeLine, index) {
    return getViewLeft([...treeLine].reverse(), treeLine.length - index - 1);
}
