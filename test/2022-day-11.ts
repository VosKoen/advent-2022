import {expect} from "chai";
import parseInput from "../common/parseInput";
import {convertInputToMonkeyArray, processRound} from "../day-11/functions";

describe("day 11", function () {
    let input: string[];

    before("get input", async function () {
        input = await parseInput(__dirname + "/2022-day-11-test-input");
    })

    it("parses the input in a useful format", function () {
        const monkeyArray = convertInputToMonkeyArray(input);

        expect(monkeyArray[0]).to.deep.equal({
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
            }
        );

        expect(monkeyArray[2]).to.deep.equal({
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
            }
        );
    });

    it('processes a round of monkey business', function () {
        const monkeyArray = convertInputToMonkeyArray(input);
        processRound(monkeyArray);
        expect(monkeyArray[0].startingItems).to.deep.equal([20, 23, 27, 26]);
        expect(monkeyArray[1].startingItems).to.deep.equal([2080, 25, 167, 207, 401, 1046]);
        expect(monkeyArray[2].startingItems).to.deep.equal([]);
        expect(monkeyArray[3].startingItems).to.deep.equal([]);
    })
});
