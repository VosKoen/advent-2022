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
const chai_1 = require("chai");
const parseInput_1 = __importDefault(require("../common/parseInput"));
const functions_1 = require("../day-11/functions");
describe("day 11", function () {
    let input;
    before("get input", function () {
        return __awaiter(this, void 0, void 0, function* () {
            input = yield (0, parseInput_1.default)(__dirname + "/2022-day-11-test-input");
        });
    });
    it("parses the input in a useful format", function () {
        const monkeyArray = (0, functions_1.convertInputToMonkeyArray)(input);
        (0, chai_1.expect)(monkeyArray[0]).to.deep.equal({
            startingItems: [79, 98],
            operation: {
                operand: 19,
                operator: '*',
            },
            test: {
                number: 23,
                true: 2,
                false: 3,
            }
        });
        (0, chai_1.expect)(monkeyArray[2]).to.deep.equal({
            startingItems: [79, 60, 97],
            operation: {
                operand: 'old',
                operator: '*',
            },
            test: {
                number: 13,
                true: 1,
                false: 3,
            }
        });
    });
    it('processes a round of monkey business', function () {
        const monkeyArray = (0, functions_1.convertInputToMonkeyArray)(input);
        (0, functions_1.processRound)(monkeyArray);
        (0, chai_1.expect)(monkeyArray[0].startingItems).to.deep.equal([20, 23, 27, 26]);
        (0, chai_1.expect)(monkeyArray[1].startingItems).to.deep.equal([2080, 25, 167, 207, 401, 1046]);
        (0, chai_1.expect)(monkeyArray[2].startingItems).to.deep.equal([]);
        (0, chai_1.expect)(monkeyArray[3].startingItems).to.deep.equal([]);
    });
});
