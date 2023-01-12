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
        const original = (yield (0, parseInput_1.default)(__dirname + "/input")).map((line) => parseInt(line, 10));
        const dynamicFile = original.map((value, originalIndex) => ({
            value,
            originalIndex,
        }));
        original.forEach((item, index) => {
            const currentIndex = dynamicFile.findIndex((entry) => entry.originalIndex === index);
            const file = dynamicFile.splice(currentIndex, 1)[0];
            let newIndex;
            if (currentIndex + file.value < 0) {
                newIndex = dynamicFile.length + (currentIndex + file.value);
            }
            else {
                newIndex = (currentIndex + file.value) % dynamicFile.length;
            }
            dynamicFile.splice(newIndex, 0, file);
        });
        const startIndex = dynamicFile.findIndex((item) => item.value === 0);
        const firstValue = dynamicFile[(1000 + startIndex) % dynamicFile.length].value;
        const secondValue = dynamicFile[(2000 + startIndex) % dynamicFile.length].value;
        const thirdValue = dynamicFile[(3000 + startIndex) % dynamicFile.length].value;
        console.log(firstValue + secondValue + thirdValue);
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const original = (yield (0, parseInput_1.default)(__dirname + "/input")).map((line) => parseInt(line, 10) * 811589153);
        const dynamicFile = original.map((value, originalIndex) => ({
            value,
            originalIndex,
        }));
        for (let i = 0; i < 10; i++) {
            original.forEach((item, index) => {
                const currentIndex = dynamicFile.findIndex((entry) => entry.originalIndex === index);
                const file = dynamicFile.splice(currentIndex, 1)[0];
                let newIndex;
                if (currentIndex + file.value < 0) {
                    newIndex =
                        dynamicFile.length + ((currentIndex + file.value) % dynamicFile.length);
                }
                else {
                    newIndex = (currentIndex + file.value) % dynamicFile.length;
                }
                dynamicFile.splice(newIndex, 0, file);
            });
        }
        const startIndex = dynamicFile.findIndex(item => item.value === 0);
        const firstValue = dynamicFile[(1000 + startIndex) % dynamicFile.length].value;
        const secondValue = dynamicFile[(2000 + startIndex) % dynamicFile.length].value;
        const thirdValue = dynamicFile[(3000 + startIndex) % dynamicFile.length].value;
        console.log(firstValue + secondValue + thirdValue);
    });
}
exports.runB = runB;
