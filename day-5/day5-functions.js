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
exports.runDay5b = exports.runDay5a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
const crates = [
    "RNFVLJSM",
    "PNDZFJWH",
    "WRCDG",
    "NBS",
    "MZWPCBFN",
    "PRMW",
    "RTNGLSW",
    "QTHFNBV",
    "LMHZNF",
];
function runDay5a() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-5a");
        const moveInput = inputArray.map((line) => [
            parseInt(line.split(" ")[1], 10),
            parseInt(line.split(" ")[3], 10),
            parseInt(line.split(" ")[5], 10),
        ]);
        moveInput.forEach((move) => processMove(crates, move));
        console.log(crates);
    });
}
exports.runDay5a = runDay5a;
function runDay5b() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-5a");
        const moveInput = inputArray.map((line) => [
            parseInt(line.split(" ")[1], 10),
            parseInt(line.split(" ")[3], 10),
            parseInt(line.split(" ")[5], 10),
        ]);
        moveInput.forEach((move) => processMove9001(crates, move));
        console.log(crates);
    });
}
exports.runDay5b = runDay5b;
function processMove(array, move) {
    for (let i = 0; i < move[0]; i++) {
        const crateItem = array[move[1] - 1].charAt(array[move[1] - 1].length - 1);
        array[move[1] - 1] = array[move[1] - 1].slice(0, -1);
        array[move[2] - 1] = array[move[2] - 1] + crateItem;
    }
}
function processMove9001(array, move) {
    const crateItem = array[move[1] - 1].substring(array[move[1] - 1].length - move[0], array[move[1] - 1].length);
    array[move[1] - 1] = array[move[1] - 1].substring(0, array[move[1] - 1].length - move[0]);
    array[move[2] - 1] = array[move[2] - 1] + crateItem;
}
