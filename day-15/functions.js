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
        const parsedInput = inputArray.map((line) => {
            const lineArray = line.split(" ");
            return [
                parseInt(lineArray[2].substring(2, lineArray[2].length - 1), 10),
                parseInt(lineArray[3].substring(2, lineArray[3].length - 1), 10),
                parseInt(lineArray[8].substring(2, lineArray[8].length - 1), 10),
                parseInt(lineArray[9].substring(2), 10),
            ];
        });
        const allGuaranteedXCoordinates = parsedInput.map((line) => guaranteedNoBeaconPerSensor([line[0], line[1]], [line[2], line[3]], 2000000));
        const set = new Set(allGuaranteedXCoordinates.reduce((acc, val) => acc.concat(val)));
        set.delete(925348);
        console.log(set.size);
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const parsedInput = inputArray.map((line) => {
            const lineArray = line.split(" ");
            return [
                parseInt(lineArray[2].substring(2, lineArray[2].length - 1), 10),
                parseInt(lineArray[3].substring(2, lineArray[3].length - 1), 10),
                parseInt(lineArray[8].substring(2, lineArray[8].length - 1), 10),
                parseInt(lineArray[9].substring(2), 10),
            ];
        });
        for (let i = 0; i <= 4000000; i++) {
            const end = checkRow(parsedInput, i);
            if (end !== 4000000) {
                console.log(i, end + 1);
                console.log(((end + 1) * 4000000) + i);
            }
        }
    });
}
exports.runB = runB;
function guaranteedNoBeaconPerSensor(sensorCoordinates, beaconCoordinates, rowIndex) {
    const xCoordinates = [];
    const xDistance = Math.abs(sensorCoordinates[0] - beaconCoordinates[0]);
    const yDistance = Math.abs(sensorCoordinates[1] - beaconCoordinates[1]);
    const sensorRange = (xDistance + yDistance) * 2 + 1;
    const distanceToRowFromSensor = Math.abs(sensorCoordinates[1] - rowIndex);
    const widthAtRow = Math.max(sensorRange - distanceToRowFromSensor * 2, 0);
    if (widthAtRow > 0) {
        for (let i = -(widthAtRow - 1) / 2; i <= (widthAtRow - 1) / 2; i++) {
            xCoordinates.push(sensorCoordinates[0] + i);
        }
    }
    return xCoordinates;
}
function checkRow(parsedInput, rowIndex) {
    const sensorRanges = parsedInput.map((line) => {
        const sensorWidth = Math.abs(line[0] - line[2]) + Math.abs(line[1] - line[3]);
        const sensorVerticalDistance = Math.abs(rowIndex - line[1]);
        if (sensorVerticalDistance > sensorWidth) {
            return [];
        }
        const sensorRange = [
            Math.max(line[0] - Math.abs(sensorWidth - sensorVerticalDistance), 0),
            Math.min(line[0] + Math.abs(sensorWidth - sensorVerticalDistance), 4000000),
        ];
        return sensorRange;
    });
    const coverage = sensorRanges
        .filter((sensor) => sensor.length === 2)
        .sort((a, b) => {
        if (a[0] > b[0]) {
            return 1;
        }
        return -1;
    })
        .filter((sensor, index, original) => {
        if (index === 0) {
            return true;
        }
        return (sensor[1] >
            original.slice(0, index).reduce((acc, val) => {
                if (val[1] > acc[1]) {
                    return val;
                }
                return acc;
            }, [0, 0])[1]);
    })
        .reduce((acc, val) => {
        if (val[0] <= acc[1]) {
            return [0, val[1]];
        }
        return acc;
    }, [0, 0]);
    return coverage[1];
}
