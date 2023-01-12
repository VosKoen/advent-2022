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
const bestResults = new Array(50).fill(0);
function runA() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const parsedInput = inputArray.map((line) => {
            const splitLine = line.split(" ").map((value) => parseInt(value, 10));
            return [
                splitLine[6],
                splitLine[12],
                splitLine[18],
                splitLine[21],
                splitLine[27],
                splitLine[30],
            ];
        });
        const qualityLevels = parsedInput.map((costs, index) => (index + 1) * determineMaxGeodes(costs));
        console.log(qualityLevels);
        console.log(qualityLevels.reduce((acc, val) => acc + val));
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        const parsedInput = inputArray
            .map((line) => {
            const splitLine = line.split(" ").map((value) => parseInt(value, 10));
            return [
                splitLine[6],
                splitLine[12],
                splitLine[18],
                splitLine[21],
                splitLine[27],
                splitLine[30],
            ];
        })
            .filter((line, index) => index < 3);
        const maxGeodes = parsedInput.map((costs) => {
            console.log(costs);
            return determineMaxGeodes(costs, 32);
        });
        console.log(maxGeodes);
        console.log(maxGeodes.reduce((acc, val) => acc * val));
    });
}
exports.runB = runB;
function determineMaxGeodes(costs, minutes = 24) {
    const costOreRobot = [costs[0], 0, 0, 0];
    const costClayRobot = [costs[1], 0, 0, 0];
    const costObsidianRobot = [costs[2], costs[3], 0, 0];
    const costGeodeRobot = [costs[4], 0, costs[5], 0];
    const allRobotCosts = [
        costOreRobot,
        costClayRobot,
        costObsidianRobot,
        costGeodeRobot,
    ];
    bestResults.fill(0);
    const bestResourceResult = simulate([1, 0, 0, 0], [0, 0, 0, 0], allRobotCosts, 0, minutes);
    return bestResourceResult[3];
}
function simulate(robotCount, resourceCount, robotCosts, minute, maxMinutes) {
    if (minute >= maxMinutes) {
        return [...resourceCount];
    }
    if (bestResults[minute] > resourceCount[3] + 2) {
        return [...resourceCount];
    }
    if (bestResults[minute] < resourceCount[3]) {
        bestResults[minute] = resourceCount[3];
    }
    const differentBuilds = [];
    const maxCostsPerResource = getMaxCostPerResource(robotCosts);
    // Always build geode cracker if possible
    if (isBuildPossible(robotCosts[3], resourceCount)) {
        const newResourceCount = deductCosts(robotCosts[3], resourceCount);
        const newRobotCount = [...robotCount];
        newRobotCount[3] += 1;
        return simulate(newRobotCount, newResourceCount.map((amount, resourceIndex) => amount + robotCount[resourceIndex]), robotCosts, minute + 1, maxMinutes);
    }
    if (isBuildPossible(robotCosts[2], resourceCount) &&
        maxCostsPerResource[2] > robotCount[2] &&
        resourceCount[2] <= maxCostsPerResource[2] + 1) {
        const newResourceCount = deductCosts(robotCosts[2], resourceCount);
        const newRobotCount = [...robotCount];
        newRobotCount[2] += 1;
        differentBuilds.push(simulate(newRobotCount, newResourceCount.map((amount, resourceIndex) => amount + robotCount[resourceIndex]), robotCosts, minute + 1, maxMinutes));
    }
    if (isBuildPossible(robotCosts[1], resourceCount) &&
        maxCostsPerResource[1] > robotCount[1] &&
        resourceCount[1] <= maxCostsPerResource[1] + 1) {
        const newResourceCount = deductCosts(robotCosts[1], resourceCount);
        const newRobotCount = [...robotCount];
        newRobotCount[1] += 1;
        differentBuilds.push(simulate(newRobotCount, newResourceCount.map((amount, resourceIndex) => amount + robotCount[resourceIndex]), robotCosts, minute + 1, maxMinutes));
    }
    if (isBuildPossible(robotCosts[0], resourceCount) &&
        maxCostsPerResource[0] > robotCount[0] &&
        resourceCount[0] <= maxCostsPerResource[0] + 1) {
        const newResourceCount = deductCosts(robotCosts[0], resourceCount);
        const newRobotCount = [...robotCount];
        newRobotCount[0] += 1;
        differentBuilds.push(simulate(newRobotCount, newResourceCount.map((amount, resourceIndex) => amount + robotCount[resourceIndex]), robotCosts, minute + 1, maxMinutes));
    }
    // Add possibility of doing nothing
    if (differentBuilds.length === 0 ||
        resourceCount[0] <= maxCostsPerResource[0] ||
        (resourceCount[1] <= maxCostsPerResource[1] && robotCount[1] >= 1) ||
        (resourceCount[2] <= maxCostsPerResource[2] && robotCount[2] >= 1)) {
        differentBuilds.push(simulate([...robotCount], resourceCount.map((amount, resourceIndex) => amount + robotCount[resourceIndex]), robotCosts, minute + 1, maxMinutes));
    }
    return differentBuilds.reduce((acc, val) => {
        if (val[3] > acc[3]) {
            return val;
        }
        return acc;
    }, [0, 0, 0, 0]);
}
function isBuildPossible(costs, resources) {
    return costs.filter((cost, index) => cost > resources[index]).length === 0;
}
function deductCosts(costs, resourceCount) {
    return resourceCount.map((amount, resourceIndex) => amount - costs[resourceIndex]);
}
function getMaxCostPerResource(costsPerRobot) {
    const maxCostPerResource = [];
    for (let i = 0; i <= 2; i++) {
        const specificResourceCosts = costsPerRobot.map((robotType) => robotType[i]);
        maxCostPerResource.push(Math.max(...specificResourceCosts));
    }
    return maxCostPerResource;
}
