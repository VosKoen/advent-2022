"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const day1_functions_1 = require("../2022/1/day1-functions");
describe("Get top values of an array", function () {
    const inputArray = [
        4, 7, 9, 2, 5, 1, 45, 2, 5, 7, 23, 1, 8, 4, 23, 2, 24, 22, 25, 8, 45,
    ];
    it("gets the top values of an array", function () {
        (0, chai_1.expect)((0, day1_functions_1.getTopValuesArray)(inputArray, 1)).to.deep.equal([45]);
        (0, chai_1.expect)((0, day1_functions_1.getTopValuesArray)(inputArray, 2)).to.deep.equal([45, 45]);
        (0, chai_1.expect)((0, day1_functions_1.getTopValuesArray)(inputArray, 3).sort()).to.deep.equal([25, 45, 45]);
        (0, chai_1.expect)((0, day1_functions_1.getTopValuesArray)(inputArray, 4).sort()).to.deep.equal([
            24, 25, 45, 45,
        ]);
    });
});
