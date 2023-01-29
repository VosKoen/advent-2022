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
        const emptyMap = inputArray.map((row) => row.split("").map((mapLocation) => {
            if (mapLocation !== "#") {
                return ".";
            }
            return mapLocation;
        }));
        let blizzards = [];
        inputArray.forEach((row, rowIndex) => row.split("").forEach((mapLocation, columnIndex) => {
            if (mapLocation === "<" ||
                mapLocation === ">" ||
                mapLocation === "^" ||
                mapLocation === "v") {
                blizzards.push({
                    row: rowIndex,
                    column: columnIndex,
                    direction: mapLocation,
                });
            }
        }));
        const startLocation = {
            row: 0,
            column: 1,
        };
        const endLocation = {
            row: emptyMap.length - 1,
            column: emptyMap[0].length - 2,
        };
        let continueSearch = true;
        let count = 0;
        let possibleLocations = [startLocation];
        console.log(endLocation);
        while (continueSearch) {
            const [newLocations, newBlizzards] = processTurn(possibleLocations, blizzards, emptyMap[0].length, emptyMap.length);
            count++;
            if (locationExistsInSet(endLocation, newLocations)) {
                console.log(count);
                continueSearch = false;
            }
            possibleLocations = newLocations;
            blizzards = newBlizzards;
        }
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const emptyMap = inputArray.map((row) => row.split("").map((mapLocation) => {
            if (mapLocation !== "#") {
                return ".";
            }
            return mapLocation;
        }));
        let blizzards = [];
        inputArray.forEach((row, rowIndex) => row.split("").forEach((mapLocation, columnIndex) => {
            if (mapLocation === "<" ||
                mapLocation === ">" ||
                mapLocation === "^" ||
                mapLocation === "v") {
                blizzards.push({
                    row: rowIndex,
                    column: columnIndex,
                    direction: mapLocation,
                });
            }
        }));
        const startLocation = {
            row: 0,
            column: 1,
        };
        const endLocation = {
            row: emptyMap.length - 1,
            column: emptyMap[0].length - 2,
        };
        let target = endLocation;
        let continueSearch = true;
        let count = 0;
        let possibleLocations = [startLocation];
        let targetReachedTimes = 0;
        while (continueSearch) {
            if (locationExistsInSet(target, possibleLocations)) {
                console.log(count);
                possibleLocations = [Object.assign({}, target)];
                targetReachedTimes++;
                target = targetReachedTimes % 2 === 0 ? endLocation : startLocation;
                if (targetReachedTimes === 3) {
                    continueSearch = false;
                }
            }
            const [newLocations, newBlizzards] = processTurn(possibleLocations, blizzards, emptyMap[0].length, emptyMap.length);
            count++;
            possibleLocations = [...newLocations];
            blizzards = newBlizzards;
        }
    });
}
exports.runB = runB;
function processTurn(currentLocations, blizzards, rowLength, columnLength) {
    const newBlizzards = getNewBlizzards(blizzards, rowLength, columnLength);
    const ownPossibleMoves = getOwnPossibleMoves(currentLocations, newBlizzards, rowLength, columnLength);
    const possibleMovesWithoutBlizzards = ownPossibleMoves.filter((possibleMove) => !locationExistsInSet(possibleMove, newBlizzards));
    return [possibleMovesWithoutBlizzards, newBlizzards];
}
function getOwnPossibleMoves(currentLocations, newBlizzards, rowLength, columnLength) {
    const newSetLocations = [];
    currentLocations.forEach((location) => {
        // Stay if possible
        if (!isBlizzed(newBlizzards, location.row, location.column) &&
            !locationExistsInSet(location, newSetLocations)) {
            newSetLocations.push(Object.assign({}, location));
        }
        // Move down if possible
        if ((location.row < columnLength - 2 ||
            (location.column === rowLength - 2 &&
                location.row === columnLength - 2)) &&
            !isBlizzed(newBlizzards, location.row + 1, location.column) &&
            !locationExistsInSet(Object.assign(Object.assign({}, location), { row: location.row + 1 }), newSetLocations)) {
            newSetLocations.push(Object.assign(Object.assign({}, location), { row: location.row + 1 }));
        }
        // Move up if possible
        if ((location.row > 1 || (location.row === 1 && location.column === 1)) &&
            !isBlizzed(newBlizzards, location.row - 1, location.column) &&
            !locationExistsInSet(Object.assign(Object.assign({}, location), { row: location.row - 1 }), newSetLocations)) {
            newSetLocations.push(Object.assign(Object.assign({}, location), { row: location.row - 1 }));
        }
        // Move left if possible
        if (location.column > 1 &&
            location.row !== columnLength - 1 &&
            !isBlizzed(newBlizzards, location.row, location.column - 1) &&
            !locationExistsInSet(Object.assign(Object.assign({}, location), { column: location.column - 1 }), newSetLocations)) {
            newSetLocations.push(Object.assign(Object.assign({}, location), { column: location.column - 1 }));
        }
        // Move right if possible
        if (location.column < rowLength - 2 &&
            location.row !== 0 &&
            !isBlizzed(newBlizzards, location.row, location.column + 1) &&
            !locationExistsInSet(Object.assign(Object.assign({}, location), { column: location.column + 1 }), newSetLocations)) {
            newSetLocations.push(Object.assign(Object.assign({}, location), { column: location.column + 1 }));
        }
    });
    return newSetLocations;
}
function isBlizzed(blizzards, row, column) {
    return (blizzards.filter((blizzard) => blizzard.row === row && blizzard.column === column).length > 0);
}
function getNewBlizzards(currentBlizzards, rowLength, columnLength) {
    return currentBlizzards.map((blizzard) => moveBlizzard(blizzard, rowLength, columnLength));
}
function moveBlizzard(currentBlizzard, rowLength, columnLength) {
    if (currentBlizzard.direction === "<") {
        if (currentBlizzard.column === 1) {
            return Object.assign(Object.assign({}, currentBlizzard), { column: rowLength - 2 });
        }
        return {
            row: currentBlizzard.row,
            column: currentBlizzard.column - 1,
            direction: currentBlizzard.direction,
        };
    }
    if (currentBlizzard.direction === ">") {
        if (currentBlizzard.column === rowLength - 2) {
            return Object.assign(Object.assign({}, currentBlizzard), { column: 1 });
        }
        return {
            row: currentBlizzard.row,
            column: currentBlizzard.column + 1,
            direction: currentBlizzard.direction,
        };
    }
    if (currentBlizzard.direction === "^") {
        if (currentBlizzard.row === 1) {
            return Object.assign(Object.assign({}, currentBlizzard), { row: columnLength - 2 });
        }
        return {
            row: currentBlizzard.row - 1,
            column: currentBlizzard.column,
            direction: currentBlizzard.direction,
        };
    }
    if (currentBlizzard.direction === "v") {
        if (currentBlizzard.row === columnLength - 2) {
            return Object.assign(Object.assign({}, currentBlizzard), { row: 1 });
        }
        return {
            row: currentBlizzard.row + 1,
            column: currentBlizzard.column,
            direction: currentBlizzard.direction,
        };
    }
    return Object.assign({}, currentBlizzard);
}
function locationExistsInSet(location, set) {
    return (set.filter((setLocation) => location.row === setLocation.row &&
        location.column === setLocation.column).length > 0);
}
