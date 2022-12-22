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
        const parsedInput = inputArray.map((line) => line
            .split(" -> ")
            .map((coordinateSet) => coordinateSet.split(",").map((coordinate) => parseInt(coordinate, 10))));
        const grid = createGrid(parsedInput);
        let continueSand = true;
        while (continueSand) {
            continueSand = processFall(grid, [0, 500]);
        }
        displayGrid(grid.map((row) => row.slice(300, 700)));
        let sandCount = 0;
        grid.forEach((row) => row.forEach((position) => {
            if (position === "o") {
                sandCount++;
            }
        }));
        console.log(sandCount);
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const parsedInput = inputArray.map((line) => line
            .split(" -> ")
            .map((coordinateSet) => coordinateSet.split(",").map((coordinate) => parseInt(coordinate, 10))));
        const grid = createGrid(parsedInput);
        grid[grid.length - 1].forEach((el, index) => grid[grid.length - 1][index] = '#');
        while (grid[0][500] === '.') {
            processFall(grid, [0, 500]);
        }
        displayGrid(grid.map((row) => row.slice(400, 620)));
        let sandCount = 0;
        grid.forEach((row) => row.forEach((position) => {
            if (position === "o") {
                sandCount++;
            }
        }));
        console.log(sandCount);
    });
}
exports.runB = runB;
function createGrid(parsedInput) {
    const highestFloorValue = Math.max(...parsedInput.map((path) => Math.max(...path.map((coordinateSets) => coordinateSets[1]))));
    const grid = new Array(highestFloorValue + 3)
        .fill(".")
        .map((row) => new Array(1000).fill("."));
    parsedInput.forEach((path) => drawPath(grid, path));
    return grid;
}
function drawPath(grid, path) {
    for (let i = 1; i < path.length; i++) {
        const difference = [
            path[i][1] - path[i - 1][1],
            path[i][0] - path[i - 1][0],
        ];
        grid[path[i - 1][1]][path[i - 1][0]] = "#";
        grid[path[i][1]][path[i][0]] = "#";
        for (let j = 0; j < Math.abs(difference[0]); j++) {
            grid[path[i - 1][1] + (difference[0] / Math.abs(difference[0])) * j][path[i - 1][0]] = "#";
        }
        for (let j = 0; j < Math.abs(difference[1]); j++) {
            grid[path[i - 1][1]][path[i - 1][0] + (difference[1] / Math.abs(difference[1])) * j] = "#";
        }
    }
}
function displayGrid(grid) {
    console.log("");
    grid.forEach((row) => console.log(row.join("")));
}
function processFall(grid, coordinates) {
    if (coordinates[0] > grid.length - 2) {
        return false;
    }
    if (grid[coordinates[0] + 1][coordinates[1]] === ".") {
        return processFall(grid, [coordinates[0] + 1, coordinates[1]]);
    }
    else if (grid[coordinates[0] + 1][coordinates[1] - 1] === ".") {
        return processFall(grid, [coordinates[0] + 1, coordinates[1] - 1]);
    }
    else if (grid[coordinates[0] + 1][coordinates[1] + 1] === ".") {
        return processFall(grid, [coordinates[0] + 1, coordinates[1] + 1]);
    }
    else {
        grid[coordinates[0]][coordinates[1]] = "o";
        return true;
    }
}
