import parseInput from "../common/parseInput";
import { start } from "repl";

type MapLocation = "." | "#" | "1" | "more" | "N" | "S" | "W" | "E";
type Map = MapLocation[][];

const directionOrder = ["N", "S", "W", "E"];

export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const initialMap = inputArray
    .map((line) => line.split(""))
    .map((line) =>
      new Array(10).fill(".").concat(line, new Array(10).fill("."))
    ) as Map;

  const standardSizeRow = new Array(initialMap[0].length).fill(".");
  const stackOfRows = [];
  for (let i = 0; i < 10; i++) {
    stackOfRows.push([...standardSizeRow]);
  }

  const mapLog = [[...stackOfRows].concat(initialMap, [...stackOfRows])];

  for (let i = 0; i < 10; i++) {
    const newMap = new Array(mapLog[0].length)
      .fill(".")
      .map((element) => new Array(mapLog[0][0].length).fill("."));

    const proposal = getMapProposal(mapLog[mapLog.length - 1], i % 4);
    proposal.forEach((row, rowIndex) => {
      row.forEach((mapLocation, columnIndex) => {
        if (mapLocation === "N") {
          if (proposal[rowIndex - 1][columnIndex] === "1") {
            newMap[rowIndex - 1][columnIndex] = "#";
          } else {
            newMap[rowIndex][columnIndex] = "#";
          }
        }
        if (mapLocation === "S") {
          if (proposal[rowIndex + 1][columnIndex] === "1") {
            newMap[rowIndex + 1][columnIndex] = "#";
          } else {
            newMap[rowIndex][columnIndex] = "#";
          }
        }
        if (mapLocation === "W") {
          if (proposal[rowIndex][columnIndex - 1] === "1") {
            newMap[rowIndex][columnIndex - 1] = "#";
          } else {
            newMap[rowIndex][columnIndex] = "#";
          }
        }
        if (mapLocation === "E") {
          if (proposal[rowIndex][columnIndex + 1] === "1") {
            newMap[rowIndex][columnIndex + 1] = "#";
          } else {
            newMap[rowIndex][columnIndex] = "#";
          }
        }
        if (mapLocation === "#") {
          newMap[rowIndex][columnIndex] = "#";
        }
      });
    });

    mapLog.push(newMap);
  }

  const finalState: Map = mapLog[mapLog.length - 1];
  const nrOfElves = finalState
    .map((row) =>
      row.reduce<number>((acc: number, val) => {
        if (val === "#") {
          return acc + 1;
        }
        return acc;
      }, 0)
    )
    .reduce((acc, val) => acc + val);

  const startRow = finalState.findIndex((row) => row.includes("#"));
  const endRow =
    finalState.length -
    1 -
    [...finalState].reverse().findIndex((row) => row.includes("#"));
  const startColumn = Math.min(
    ...finalState
      .map((row) => row.findIndex((mapLocation) => mapLocation === "#"))
      .filter((indexValue) => indexValue !== -1)
  );
  const endColumn = Math.max(
    ...finalState
      .map(
        (row) =>
          row.length -
          1 -
          [...row].reverse().findIndex((mapLocation) => mapLocation === "#")
      )
      .filter((indexValue) => indexValue < finalState[0].length)
  );
  console.log(finalState);
  console.log(
    (endRow - startRow + 1) * (endColumn - startColumn + 1) - nrOfElves
  );
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
  const initialMap = inputArray
    .map((line) => line.split(""))
    .map((line) =>
      new Array(1000).fill(".").concat(line, new Array(1000).fill("."))
    ) as Map;

  const standardSizeRow = new Array(initialMap[0].length).fill(".");
  const stackOfRows = [];
  for (let i = 0; i < 1000; i++) {
    stackOfRows.push([...standardSizeRow]);
  }

  let previousMap = [...stackOfRows].concat(initialMap, [...stackOfRows]);

  for (let i = 0; i < 99999999; i++) {
    const newMap = new Array(previousMap.length)
      .fill(".")
      .map((element) => new Array(previousMap[0].length).fill("."));

    const proposal = getMapProposal(previousMap, i % 4);
    proposal.forEach((row, rowIndex) => {
      row.forEach((mapLocation, columnIndex) => {
        if (mapLocation === "N") {
          if (proposal[rowIndex - 1][columnIndex] === "1") {
            newMap[rowIndex - 1][columnIndex] = "#";
          } else {
            newMap[rowIndex][columnIndex] = "#";
          }
        }
        if (mapLocation === "S") {
          if (proposal[rowIndex + 1][columnIndex] === "1") {
            newMap[rowIndex + 1][columnIndex] = "#";
          } else {
            newMap[rowIndex][columnIndex] = "#";
          }
        }
        if (mapLocation === "W") {
          if (proposal[rowIndex][columnIndex - 1] === "1") {
            newMap[rowIndex][columnIndex - 1] = "#";
          } else {
            newMap[rowIndex][columnIndex] = "#";
          }
        }
        if (mapLocation === "E") {
          if (proposal[rowIndex][columnIndex + 1] === "1") {
            newMap[rowIndex][columnIndex + 1] = "#";
          } else {
            newMap[rowIndex][columnIndex] = "#";
          }
        }
        if (mapLocation === "#") {
          newMap[rowIndex][columnIndex] = "#";
        }
      });
    });
    if(mapsAreEqual(newMap, previousMap)) {
      console.log(i + 1);
      break;
    }
    previousMap = newMap;
  }
}

function mapsAreEqual(map1: Map, map2: Map): boolean {

  return (
    map1
      .map(
        (row, rowIndex) =>
          row.filter(
            (mapLocation, columnIndex) =>
              map2[rowIndex][columnIndex] !== mapLocation
          ).length
      )
      .filter((foundDifferences) => foundDifferences !== 0).length === 0
  );
}

function getMapProposal(currentMap: Map, directionOrderIndex: number): Map {
  const proposal = new Array(currentMap.length)
    .fill(".")
    .map((element) => new Array(currentMap[0].length).fill("."));

  for (let i = 0; i < proposal.length; i++) {
    for (let j = 0; j < proposal[i].length; j++) {
      if (currentMap[i][j] === "#") {
        considerProposal(proposal, currentMap, i, j, directionOrderIndex);
      }
    }
  }
  return proposal;
}

function considerProposal(
  proposal: Map,
  currentMap: Map,
  row: number,
  column: number,
  directionOrderIndex: number
): void {
  const directions = directionOrder
    .slice(directionOrderIndex)
    .concat(directionOrder.slice(0, directionOrderIndex));

  if (
    !hasNorthernElves(currentMap, row, column) &&
    !hasSouthernElves(currentMap, row, column) &&
    !hasWesternElves(currentMap, row, column) &&
    !hasEasternElves(currentMap, row, column)
  ) {
    proposal[row][column] = "#";
    return;
  }

  for (let i = 0; i <= 3; i++) {
    if (
      directions[i] === "N" &&
      row > 0 &&
      !hasNorthernElves(currentMap, row, column)
    ) {
      proposeMove(proposal, row - 1, column);
      proposal[row][column] = "N";
      break;
    }
    if (
      directions[i] === "E" &&
      column < currentMap[row].length - 1 &&
      !hasEasternElves(currentMap, row, column)
    ) {
      proposeMove(proposal, row, column + 1);
      proposal[row][column] = "E";
      break;
    }
    if (
      directions[i] === "S" &&
      row < currentMap.length - 1 &&
      !hasSouthernElves(currentMap, row, column)
    ) {
      proposeMove(proposal, row + 1, column);
      proposal[row][column] = "S";
      break;
    }
    if (
      directions[i] === "W" &&
      column > 0 &&
      !hasWesternElves(currentMap, row, column)
    ) {
      proposeMove(proposal, row, column - 1);
      proposal[row][column] = "W";
      break;
    }
    proposal[row][column] = "#";
  }
}

function proposeMove(proposalMap: Map, row: number, column: number): void {
  if (proposalMap[row][column] === ".") {
    proposalMap[row][column] = "1";
  } else {
    proposalMap[row][column] = "more";
  }
}

function hasNorthernElves(
  currentMap: Map,
  row: number,
  column: number
): boolean {
  return (
    [
      [row - 1, column - 1],
      [row - 1, column],
      [row - 1, column + 1],
    ].filter(
      (position) =>
        position[0] >= 0 &&
        position[1] >= 0 &&
        position[0] < currentMap.length &&
        position[1] < currentMap[position[0]].length &&
        (currentMap[position[0]][position[1]] === "#" ||
          directionOrder.includes(currentMap[position[0]][position[1]]))
    ).length > 0
  );
}

function hasSouthernElves(
  currentMap: Map,
  row: number,
  column: number
): boolean {
  return (
    [
      [row + 1, column - 1],
      [row + 1, column],
      [row + 1, column + 1],
    ].filter(
      (position) =>
        position[0] >= 0 &&
        position[1] >= 0 &&
        position[0] < currentMap.length &&
        position[1] < currentMap[position[0]].length &&
        (currentMap[position[0]][position[1]] === "#" ||
          directionOrder.includes(currentMap[position[0]][position[1]]))
    ).length > 0
  );
}

function hasWesternElves(
  currentMap: Map,
  row: number,
  column: number
): boolean {
  return (
    [
      [row - 1, column - 1],
      [row, column - 1],
      [row + 1, column - 1],
    ].filter(
      (position) =>
        position[0] >= 0 &&
        position[1] >= 0 &&
        position[0] < currentMap.length &&
        position[1] < currentMap[position[0]].length &&
        (currentMap[position[0]][position[1]] === "#" ||
          directionOrder.includes(currentMap[position[0]][position[1]]))
    ).length > 0
  );
}

function hasEasternElves(
  currentMap: Map,
  row: number,
  column: number
): boolean {
  return (
    [
      [row - 1, column + 1],
      [row, column + 1],
      [row + 1, column + 1],
    ].filter(
      (position) =>
        position[0] >= 0 &&
        position[1] >= 0 &&
        position[0] < currentMap.length &&
        position[1] < currentMap[position[0]].length &&
        (currentMap[position[0]][position[1]] === "#" ||
          directionOrder.includes(currentMap[position[0]][position[1]]))
    ).length > 0
  );
}
