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
const maxResults = new Array(31).fill(0);
function runA() {
    return __awaiter(this, void 0, void 0, function* () {
        const valves = yield getParsedInput();
        const nodes = createGraph(valves);
        const shortestPaths = nodes.map((node) => [
            node.valveId,
            findPathsToNode(nodes, node.valveId),
        ]);
        const log = processSteps(nodes, valves, shortestPaths, "AA", 30, 0, [
            [30, "AA", 0, 0],
        ]);
        console.log(log);
    });
}
exports.runA = runA;
function runB() {
    return __awaiter(this, void 0, void 0, function* () {
        const valves = yield getParsedInput();
        const nodes = createGraph(valves);
        const shortestPaths = nodes.map((node) => [
            node.valveId,
            findPathsToNode(nodes, node.valveId),
        ]);
        const human = {
            nextTarget: "AA",
            stepsToNextTarget: 0,
        };
        const elephant = {
            nextTarget: "AA",
            stepsToNextTarget: 0,
        };
        console.log(processElephantSteps(nodes, valves, shortestPaths, 26, 0, human, elephant));
    });
}
exports.runB = runB;
function getParsedInput() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input");
        return inputArray
            .map((line) => {
            const splitLine = line.split(" ");
            const parsedLine = [
                splitLine[1],
                splitLine[4].replace("rate=", "").replace(";", ""),
            ];
            for (let i = 9; i < splitLine.length; i++) {
                parsedLine.push(splitLine[i].replace(",", ""));
            }
            return parsedLine;
        })
            .map((line) => {
            return {
                id: line[0],
                flowRate: parseInt(line[1], 10),
                valves: line.slice(2),
                explored: [],
                isClosed: true,
            };
        });
    });
}
function createGraph(valves) {
    const nodes = valves
        .filter((valve) => valve.flowRate > 0 || valve.id === "AA")
        .map((valve) => ({ valveId: valve.id, lines: [] }));
    nodes.forEach((node) => {
        exploreLines(nodes, valves, node.valveId, node.valveId);
    });
    return nodes;
}
function exploreLines(nodes, valves, fromNodeId, currentValveId, exploredValves = [], currentPathLength = 0) {
    exploredValves.push(currentValveId);
    if (fromNodeId !== currentValveId &&
        nodes.find((node) => node.valveId === currentValveId)) {
        updateNodeLines(nodes, [fromNodeId, currentValveId], currentPathLength);
    }
    else {
        const currentValve = valves.find((valve) => valve.id === currentValveId);
        currentValve.valves
            .filter((valveId) => !exploredValves.includes(valveId))
            .forEach((valveId) => {
            exploreLines(nodes, valves, fromNodeId, valveId, [...exploredValves], currentPathLength + 1);
        });
    }
}
function updateNodeLines(nodes, nodesToUpdate, pathLength) {
    const nodeA = nodes.find((node) => node.valveId === nodesToUpdate[0]);
    const lineA = nodeA.lines.find((line) => line.toNode === nodesToUpdate[1]);
    if (lineA) {
        if (lineA.length > pathLength) {
            lineA.length = pathLength;
        }
    }
    else {
        nodeA.lines.push({
            toNode: nodesToUpdate[1],
            length: pathLength,
        });
    }
    const nodeB = nodes.find((node) => node.valveId === nodesToUpdate[1]);
    const lineB = nodeB.lines.find((line) => line.toNode === nodesToUpdate[0]);
    if (lineB) {
        if (lineB.length > pathLength) {
            lineB.length = pathLength;
        }
    }
    else {
        nodeB.lines.push({
            toNode: nodesToUpdate[0],
            length: pathLength,
        });
    }
}
function findPathsToNode(nodes, targetNodeId) {
    const pathLengthsToTarget = nodes.map((node) => [
        node.valveId,
        9999,
    ]);
    pathLengthsToTarget.find((entry) => entry[0] === targetNodeId)[1] = 0;
    processNode(nodes, pathLengthsToTarget, targetNodeId);
    return pathLengthsToTarget;
}
function processNode(nodes, pathLengths, targetNodeId) {
    const targetNode = nodes.find((node) => node.valveId === targetNodeId);
    const distanceTargetNode = pathLengths.find((pathLength) => pathLength[0] === targetNodeId)[1];
    targetNode.lines.forEach((line) => {
        const pathLengthToCheck = pathLengths.find((pathLength) => pathLength[0] === line.toNode);
        if (pathLengthToCheck[1] > distanceTargetNode + line.length) {
            pathLengthToCheck[1] = distanceTargetNode + line.length;
            processNode(nodes, pathLengths, line.toNode);
        }
    });
}
function processElephantSteps(nodes, valves, shortestPaths, stepsLeft, pressureReleasedStart, originalHuman, originalElephant, history = []) {
    const newHistory = [...history];
    const valvesToProcess = [...valves].map((valve) => Object.assign({}, valve));
    const pressureFlow = valvesToProcess
        .filter((valve) => !valve.isClosed)
        .reduce((acc, val) => acc + val.flowRate, 0);
    const pressureReleased = pressureReleasedStart + pressureFlow;
    if (stepsLeft <= 0) {
        newHistory.push([stepsLeft, pressureFlow, pressureReleased]);
        return [pressureReleased, newHistory];
    }
    // If we deviate too much from the best performer, return 0
    if (maxResults[stepsLeft] > pressureReleased + 50) {
        return [0, newHistory];
    }
    if (maxResults[stepsLeft] < pressureReleased) {
        maxResults[stepsLeft] = pressureReleased;
    }
    const closedValves = valvesToProcess.filter((valve) => valve.isClosed && valve.flowRate > 0);
    if (closedValves.length <= 0) {
        newHistory.push([stepsLeft, pressureFlow, pressureReleased]);
        return [pressureReleased + pressureFlow * stepsLeft, newHistory];
    }
    const human = {
        stepsToNextTarget: Math.max(originalHuman.stepsToNextTarget - 1, 0),
        nextTarget: originalHuman.nextTarget,
    };
    const elephant = {
        stepsToNextTarget: Math.max(originalElephant.stepsToNextTarget - 1, 0),
        nextTarget: originalElephant.nextTarget,
    };
    let renewHumanTarget = false;
    let renewElephantTarget = false;
    if (human.stepsToNextTarget === 0) {
        renewHumanTarget = true;
        if (valvesToProcess.find((valve) => valve.id === human.nextTarget && valve.isClosed)) {
            // Open the valve
            const valveToOpen = valvesToProcess.find((valve) => valve.id === human.nextTarget);
            valveToOpen.isClosed = false;
            newHistory.push([stepsLeft, pressureFlow, pressureReleased, valveToOpen.id, 'By Human']);
        }
    }
    if (elephant.stepsToNextTarget === 0) {
        renewElephantTarget = true;
        if (closedValves.find((valve) => valve.id === elephant.nextTarget && valve.isClosed)) {
            // Open the valve
            const valveToOpen = valvesToProcess.find((valve) => valve.id === elephant.nextTarget);
            valveToOpen.isClosed = false;
            newHistory.push([stepsLeft, pressureFlow, pressureReleased, valveToOpen.id, 'By Elephant']);
        }
    }
    if (renewElephantTarget || renewHumanTarget) {
        const humans = [];
        const elephants = [];
        if (renewHumanTarget &&
            valvesToProcess.filter((valve) => valve.isClosed && valve.flowRate > 0)
                .length >= 1) {
            valvesToProcess
                .filter((valve) => valve.isClosed && valve.flowRate > 0)
                .forEach((valve) => {
                humans.push({
                    nextTarget: valve.id,
                    stepsToNextTarget: distanceBetweenNodes(shortestPaths, human.nextTarget, valve.id) +
                        1,
                });
            });
        }
        else {
            humans.push(human);
        }
        if (renewElephantTarget &&
            valvesToProcess.filter((valve) => valve.isClosed && valve.flowRate > 0)
                .length >= 1) {
            valvesToProcess
                .filter((valve) => valve.isClosed && valve.flowRate > 0)
                .forEach((valve) => {
                elephants.push({
                    nextTarget: valve.id,
                    stepsToNextTarget: distanceBetweenNodes(shortestPaths, elephant.nextTarget, valve.id) + 1,
                });
            });
        }
        else {
            elephants.push(elephant);
        }
        return humans
            .map((possibleHuman) => elephants
            .map((possibleElephant) => processElephantSteps(nodes, valvesToProcess, shortestPaths, stepsLeft - 1, pressureReleased, possibleHuman, possibleElephant, newHistory))
            .reduce((acc, val) => {
            if (acc[0] > val[0]) {
                return acc;
            }
            return val;
        }, [0, []]))
            .reduce((acc, val) => {
            if (acc[0] > val[0]) {
                return acc;
            }
            return val;
        }, [0, []]);
    }
    return processElephantSteps(nodes, valvesToProcess, shortestPaths, stepsLeft - 1, pressureReleased, human, elephant, newHistory);
}
function distanceBetweenNodes(shortestPaths, nodeA, nodeB) {
    return shortestPaths.find((shortestPathsForNode) => shortestPathsForNode[0] === nodeA)[1].find((shortestPath) => shortestPath[0] === nodeB)[1];
}
function processSteps(nodes, valves, shortestPaths, currentValveId, stepsLeft, pressureReleasedStart, history) {
    const pressureFlow = valves
        .filter((valve) => !valve.isClosed)
        .reduce((acc, val) => acc + val.flowRate, 0);
    const pressureReleased = pressureReleasedStart + pressureFlow;
    // If we deviate too much from the best performer, return 0
    if (maxResults[stepsLeft] > pressureReleased + 40) {
        return [0, history];
    }
    if (maxResults[stepsLeft] < pressureReleased) {
        maxResults[stepsLeft] = pressureReleased;
    }
    const potentialNodesToVisit = valves.filter((valve) => valve.isClosed && valve.flowRate > 0);
    if (potentialNodesToVisit.length === 0) {
        const newHistory = [...history];
        newHistory.push([
            0,
            currentValveId,
            pressureFlow,
            pressureReleased + (stepsLeft - 1) * pressureFlow,
        ]);
        return [pressureReleased + (stepsLeft - 1) * pressureFlow, newHistory];
    }
    const currentNode = nodes.find((node) => node.valveId === currentValveId);
    const pressurePossibilities = potentialNodesToVisit.map((potentialNode) => {
        if (currentValveId === potentialNode.id &&
            potentialNode.isClosed &&
            potentialNode.flowRate > 0) {
            const valvesToProcess = [...valves].map((valve) => Object.assign({}, valve));
            const valveToOpen = valvesToProcess.find((valve) => valve.id === potentialNode.id);
            valveToOpen.isClosed = false;
            const newHistory = [...history];
            newHistory.push([
                stepsLeft - 1,
                currentValveId,
                pressureFlow,
                pressureReleased,
            ]);
            return processSteps(nodes, valvesToProcess, shortestPaths, currentValveId, stepsLeft - 1, pressureReleased, newHistory);
        }
        const lengthToGet = shortestPaths.find((shortestPathsForNode) => shortestPathsForNode[0] === currentNode.valveId)[1].find((shortestPath) => shortestPath[0] === potentialNode.id)[1];
        const nextNodeId = determineNextNode(nodes, currentNode, potentialNode.id, lengthToGet);
        const stepsToNextNode = currentNode.lines.find((line) => line.toNode === nextNodeId).length;
        if (stepsToNextNode > stepsLeft) {
            const newHistory = [...history];
            newHistory.push([
                0,
                currentValveId,
                pressureFlow,
                pressureReleased + (stepsLeft - 1) * pressureFlow,
            ]);
            return [pressureReleased + (stepsLeft - 1) * pressureFlow, newHistory];
        }
        const pressureReleasedToNextNode = (stepsToNextNode - 1) * pressureFlow;
        const newHistory = [...history];
        newHistory.push([
            stepsLeft - stepsToNextNode,
            nextNodeId,
            pressureFlow,
            pressureReleased + pressureReleasedToNextNode,
        ]);
        return processSteps(nodes, valves, shortestPaths, nextNodeId, stepsLeft - stepsToNextNode, pressureReleased + pressureReleasedToNextNode, newHistory);
    });
    return pressurePossibilities.reduce((acc, val) => {
        if (acc[0] > val[0]) {
            return acc;
        }
        return val;
    });
}
function determineNextNode(nodes, currentNode, targetNodeId, targetLength) {
    if (currentNode.lines.find((line) => line.toNode === targetNodeId && line.length === targetLength)) {
        return targetNodeId;
    }
    const checkResults = currentNode.lines
        .filter((line) => line.toNode !== targetNodeId && line.length < targetLength)
        .map((line) => {
        const nodeToCheck = nodes.find((node) => node.valveId === line.toNode);
        return determineNextNode(nodes, nodeToCheck, targetNodeId, targetLength - line.length)
            ? nodeToCheck.valveId
            : undefined;
    })
        .filter((element) => element !== undefined);
    if (checkResults.length === 0) {
        return undefined;
    }
    return checkResults[0];
}
