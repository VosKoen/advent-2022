import { expect } from "chai";
import { getTopValuesArray } from "../day-1/day1-functions";

describe("Get top values of an array", function () {
  const inputArray = [
    4, 7, 9, 2, 5, 1, 45, 2, 5, 7, 23, 1, 8, 4, 23, 2, 24, 22, 25, 8, 45,
  ];

  it("gets the top values of an array", function () {
    expect(getTopValuesArray(inputArray, 1)).to.deep.equal([45]);
    expect(getTopValuesArray(inputArray, 2)).to.deep.equal([45, 45]);
    expect(getTopValuesArray(inputArray, 3).sort()).to.deep.equal([25, 45, 45]);
    expect(getTopValuesArray(inputArray, 4).sort()).to.deep.equal([
      24, 25, 45, 45,
    ]);

  });
});
