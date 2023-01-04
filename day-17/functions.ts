import parseInput from "../common/parseInput";
import {pathToFileURL} from "url";

export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const jets = inputArray[0].split("");
  const columns: number[][] = [[0], [0], [0], [0], [0], [0], [0]];
  for (let i = 0; i < 2022; i++) {
    if (i % 5 === 0) {
      dropRock(columns, rock1, jets);
    }
    if (i % 5 === 1) {
      dropRock(columns, rock2, jets);
    }
    if (i % 5 === 2) {
      dropRock(columns, rock3, jets);
    }
    if (i % 5 === 3) {
      dropRock(columns, rock4, jets);
    }
    if (i % 5 === 4) {
      dropRock(columns, rock5, jets);
    }
  }
  console.log(determineHeight(columns));
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
  const heightIncrease: number[] = [];
  const jets = inputArray[0].split("");
  const columns: number[][] = [[0], [0], [0], [0], [0], [0], [0]];
  const heights: number[] = [];
  for (let i = 0; i < 10000; i++) {
    const originalHeight = determineHeight(columns);
    if (i % 5 === 0) {
      dropRock(columns, rock1, jets);
    }
    if (i % 5 === 1) {
      dropRock(columns, rock2, jets);
    }
    if (i % 5 === 2) {
      dropRock(columns, rock3, jets);
    }
    if (i % 5 === 3) {
      dropRock(columns, rock4, jets);
    }
    if (i % 5 === 4) {
      dropRock(columns, rock5, jets);
    }
    heights.push(determineHeight(columns));
    heightIncrease.push(heights[heights.length-1]-originalHeight);
  }

  const repetitions: number[] = [];
  for(let i = 2000; i<6500; i++) {
    const patternToFind = heightIncrease.slice(2000, i+1);
    const shouldMatch = heightIncrease.slice(i+1, i+2+(i-2000));
    if(patternToFind.join('') === shouldMatch.join('')) {
      repetitions.push(i);
    }
  }
  const patternLength = repetitions[repetitions.length-1] - repetitions[repetitions.length-2];
  const lastOccurance = repetitions[repetitions.length-1];

  const remainder = (1000000000000 - lastOccurance) % patternLength;
  const heightTotal = Math.floor((1000000000000 - lastOccurance)/patternLength)*(heights[lastOccurance] - heights[lastOccurance-patternLength]) + heights[lastOccurance+remainder] - 1;
  console.log(heightTotal);
}

// Rocks defined by coordinates from intersection leftmost and bottommost edges
const rock1: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
];
const rock2: [number, number][] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [1, 2],
];
const rock3: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1],
  [2, 2],
];
const rock4: [number, number][] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
];
const rock5: [number, number][] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

function dropRock(
  columns: number[][],
  rock: [number, number][],
  jets: string[]
) {
  const dropHeight = determineHeight(columns) + 4;
  const initialLocation = rock.map<[number, number]>((rockPart) => [
    rockPart[0] + 2,
    rockPart[1] + dropHeight,
  ]);
  processFall(columns, initialLocation, jets);
}

function determineHeight(columns: number[][]): number {
  return Math.max(...columns.map((column) => Math.max(...column)));
}

function processFall(
  columns: number[][],
  rock: [number, number][],
  jets: string[]
) {
  const currentJet = jets.splice(0, 1)[0];
  const rockAfterJet = processJet(currentJet, columns, rock);
  jets.push(currentJet);
  const canDrop =
    rockAfterJet.filter((rockPart) =>
      columns[rockPart[0]].includes(rockPart[1] - 1)
    ).length === 0;
  if (canDrop) {
    const rockAfterDrop = rockAfterJet.map<[number, number]>((rockPart) => [
      rockPart[0],
      rockPart[1] - 1,
    ]);
    processFall(columns, rockAfterDrop, jets);
  } else {
    rockAfterJet.forEach((rockPart) => columns[rockPart[0]].push(rockPart[1]));
  }
}

function processJet(
  jetSymbol: string,
  columns: number[][],
  rockLocation: [number, number][]
): [number, number][] {
  if (jetSymbol === "<") {
    const canMove =
      rockLocation.filter(
        (rockPart) =>
          rockPart[0] === 0 || columns[rockPart[0] - 1].includes(rockPart[1])
      ).length === 0;
    if (canMove) {
      return rockLocation.map((rockPart) => [rockPart[0] - 1, rockPart[1]]);
    }
    return [...rockLocation];
  }
  if (jetSymbol === ">") {
    const canMove =
      rockLocation.filter(
        (rockPart) =>
          rockPart[0] === 6 || columns[rockPart[0] + 1].includes(rockPart[1])
      ).length === 0;
    if (canMove) {
      return rockLocation.map((rockPart) => [rockPart[0] + 1, rockPart[1]]);
    }
    return [...rockLocation];
  }
  return [...rockLocation];
}
