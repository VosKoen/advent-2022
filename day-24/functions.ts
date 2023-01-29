import parseInput from "../common/parseInput";
import { start } from "repl";

type Blizzard = {
  row: number;
  column: number;
  direction: "<" | ">" | "^" | "v";
};

type OwnLocation = {
  row: number;
  column: number;
};

export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const emptyMap = inputArray.map((row) =>
    row.split("").map((mapLocation) => {
      if (mapLocation !== "#") {
        return ".";
      }
      return mapLocation;
    })
  );
  let blizzards: Blizzard[] = [];

  inputArray.forEach((row, rowIndex) =>
    row.split("").forEach((mapLocation, columnIndex) => {
      if (
        mapLocation === "<" ||
        mapLocation === ">" ||
        mapLocation === "^" ||
        mapLocation === "v"
      ) {
        blizzards.push({
          row: rowIndex,
          column: columnIndex,
          direction: mapLocation,
        });
      }
    })
  );

  const startLocation: OwnLocation = {
    row: 0,
    column: 1,
  };

  const endLocation: OwnLocation = {
    row: emptyMap.length - 1,
    column: emptyMap[0].length - 2,
  };
  let continueSearch = true;
  let count = 0;
  let possibleLocations = [startLocation];
  console.log(endLocation);
  while (continueSearch) {
    const [newLocations, newBlizzards] = processTurn(
      possibleLocations,
      blizzards,
      emptyMap[0].length,
      emptyMap.length
    );
    count++;

    if (locationExistsInSet(endLocation, newLocations)) {
      console.log(count);
      continueSearch = false;
    }
    possibleLocations = newLocations;
    blizzards = newBlizzards;
  }
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
  const emptyMap = inputArray.map((row) =>
    row.split("").map((mapLocation) => {
      if (mapLocation !== "#") {
        return ".";
      }
      return mapLocation;
    })
  );
  let blizzards: Blizzard[] = [];

  inputArray.forEach((row, rowIndex) =>
    row.split("").forEach((mapLocation, columnIndex) => {
      if (
        mapLocation === "<" ||
        mapLocation === ">" ||
        mapLocation === "^" ||
        mapLocation === "v"
      ) {
        blizzards.push({
          row: rowIndex,
          column: columnIndex,
          direction: mapLocation,
        });
      }
    })
  );

  const startLocation: OwnLocation = {
    row: 0,
    column: 1,
  };

  const endLocation: OwnLocation = {
    row: emptyMap.length - 1,
    column: emptyMap[0].length - 2,
  };
  let target = endLocation;
  let continueSearch = true;
  let count = 0;
  let possibleLocations = [startLocation];
  let targetReachedTimes = 0;

  while (continueSearch) {
    if (locationExistsInSet(target, possibleLocations)) {
      console.log(count);
      possibleLocations = [{ ...target }];
      targetReachedTimes++;
      target = targetReachedTimes % 2 === 0 ? endLocation : startLocation;
      if (targetReachedTimes === 3) {
        continueSearch = false;
      }
    }

    const [newLocations, newBlizzards] = processTurn(
      possibleLocations,
      blizzards,
      emptyMap[0].length,
      emptyMap.length
    );
    count++;

    possibleLocations = [...newLocations];
    blizzards = newBlizzards;
  }
}

function processTurn(
  currentLocations: OwnLocation[],
  blizzards: Blizzard[],
  rowLength: number,
  columnLength: number
): [OwnLocation[], Blizzard[]] {
  const newBlizzards = getNewBlizzards(blizzards, rowLength, columnLength);
  const ownPossibleMoves = getOwnPossibleMoves(
    currentLocations,
    newBlizzards,
    rowLength,
    columnLength
  );
  const possibleMovesWithoutBlizzards = ownPossibleMoves.filter(
    (possibleMove) => !locationExistsInSet(possibleMove, newBlizzards)
  );
  return [possibleMovesWithoutBlizzards, newBlizzards];
}

function getOwnPossibleMoves(
  currentLocations: OwnLocation[],
  newBlizzards: Blizzard[],
  rowLength: number,
  columnLength: number
): OwnLocation[] {
  const newSetLocations: OwnLocation[] = [];

  currentLocations.forEach((location) => {
    // Stay if possible
    if (
      !isBlizzed(newBlizzards, location.row, location.column) &&
      !locationExistsInSet(location, newSetLocations)
    ) {
      newSetLocations.push({ ...location });
    }
    // Move down if possible
    if (
      (location.row < columnLength - 2 ||
        (location.column === rowLength - 2 &&
          location.row === columnLength - 2)) &&
      !isBlizzed(newBlizzards, location.row + 1, location.column) &&
      !locationExistsInSet(
        { ...location, row: location.row + 1 },
        newSetLocations
      )
    ) {
      newSetLocations.push({ ...location, row: location.row + 1 });
    }
    // Move up if possible
    if (
      (location.row > 1 || (location.row === 1 && location.column === 1)) &&
      !isBlizzed(newBlizzards, location.row - 1, location.column) &&
      !locationExistsInSet(
        { ...location, row: location.row - 1 },
        newSetLocations
      )
    ) {
      newSetLocations.push({ ...location, row: location.row - 1 });
    }
    // Move left if possible
    if (
      location.column > 1 &&
      location.row !== columnLength - 1 &&
      !isBlizzed(newBlizzards, location.row, location.column - 1) &&
      !locationExistsInSet(
        { ...location, column: location.column - 1 },
        newSetLocations
      )
    ) {
      newSetLocations.push({ ...location, column: location.column - 1 });
    }
    // Move right if possible
    if (
      location.column < rowLength - 2 &&
      location.row !== 0 &&
      !isBlizzed(newBlizzards, location.row, location.column + 1) &&
      !locationExistsInSet(
        { ...location, column: location.column + 1 },
        newSetLocations
      )
    ) {
      newSetLocations.push({ ...location, column: location.column + 1 });
    }
  });
  return newSetLocations;
}

function isBlizzed(
  blizzards: Blizzard[],
  row: number,
  column: number
): boolean {
  return (
    blizzards.filter(
      (blizzard) => blizzard.row === row && blizzard.column === column
    ).length > 0
  );
}

function getNewBlizzards(
  currentBlizzards: Blizzard[],
  rowLength: number,
  columnLength: number
): Blizzard[] {
  return currentBlizzards.map((blizzard) =>
    moveBlizzard(blizzard, rowLength, columnLength)
  );
}

function moveBlizzard(
  currentBlizzard: Blizzard,
  rowLength: number,
  columnLength: number
): Blizzard {
  if (currentBlizzard.direction === "<") {
    if (currentBlizzard.column === 1) {
      return { ...currentBlizzard, column: rowLength - 2 };
    }
    return {
      row: currentBlizzard.row,
      column: currentBlizzard.column - 1,
      direction: currentBlizzard.direction,
    };
  }
  if (currentBlizzard.direction === ">") {
    if (currentBlizzard.column === rowLength - 2) {
      return { ...currentBlizzard, column: 1 };
    }
    return {
      row: currentBlizzard.row,
      column: currentBlizzard.column + 1,
      direction: currentBlizzard.direction,
    };
  }
  if (currentBlizzard.direction === "^") {
    if (currentBlizzard.row === 1) {
      return { ...currentBlizzard, row: columnLength - 2 };
    }
    return {
      row: currentBlizzard.row - 1,
      column: currentBlizzard.column,
      direction: currentBlizzard.direction,
    };
  }
  if (currentBlizzard.direction === "v") {
    if (currentBlizzard.row === columnLength - 2) {
      return { ...currentBlizzard, row: 1 };
    }
    return {
      row: currentBlizzard.row + 1,
      column: currentBlizzard.column,
      direction: currentBlizzard.direction,
    };
  }
  return { ...currentBlizzard };
}

function locationExistsInSet(
  location: OwnLocation,
  set: OwnLocation[]
): boolean {
  return (
    set.filter(
      (setLocation: OwnLocation) =>
        location.row === setLocation.row &&
        location.column === setLocation.column
    ).length > 0
  );
}
