import parseInput from "../common/parseInput";

type Orientation = "N" | "E" | "S" | "W";

type PositionalState = {
  row: number;
  column: number;
  orientation: Orientation;
};

type MapLocation = "." | "#" | " ";

type Map = MapLocation[][];

type TurnCommand = "R" | "L";

export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const commands = inputArray.pop() as string;
  inputArray.pop();

  const map = inputArray.map((line) => line.split("")) as Map;
  const maxRowLength = Math.max(...map.map((row) => row.length));
  map.forEach((row) => {
    while (row.length < maxRowLength) {
      row.push(" ");
    }
  });
  const paces = commands.split(/[R,L]/);
  const turns = commands
    .split(/\d+/)
    .filter((turnCommand) => turnCommand !== "") as TurnCommand[];

  const initialState: PositionalState = {
    row: 0,
    column: map[0].findIndex((mapLocation) => mapLocation === "."),
    orientation: "E",
  };
  const stateLog: PositionalState[] = [initialState];

  paces.forEach((pace, index) => {
    stateLog.push(
      processSteps(stateLog[stateLog.length - 1], map, parseInt(pace, 10))
    );
    if (index < turns.length) {
      stateLog.push(processTurn(stateLog[stateLog.length - 1], turns[index]));
    }
  });

  const endState = stateLog[stateLog.length - 1];
  const orientationValues: Orientation[] = ["E", "S", "W", "N"];
  console.log(
    (endState.row + 1) * 1000 +
      (endState.column + 1) * 4 +
      orientationValues.findIndex(
        (orientation) => orientation === endState.orientation
      )
  );
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
  const commands = inputArray.pop() as string;
  inputArray.pop();

  const map = inputArray.map((line) => line.split("")) as Map;
  const maxRowLength = Math.max(...map.map((row) => row.length));
  map.forEach((row) => {
    while (row.length < maxRowLength) {
      row.push(" ");
    }
  });
  const paces = commands.split(/[R,L]/);
  const turns = commands
      .split(/\d+/)
      .filter((turnCommand) => turnCommand !== "") as TurnCommand[];

  const initialState: PositionalState = {
    row: 0,
    column: map[0].findIndex((mapLocation) => mapLocation === "."),
    orientation: "E",
  };
  const stateLog: PositionalState[] = [initialState];

  paces.forEach((pace, index) => {
    const originalState = { ...stateLog[stateLog.length - 1] };

    stateLog.push(
        processSteps(stateLog[stateLog.length - 1], map, parseInt(pace, 10), true)
    );
    if (index < turns.length) {
      stateLog.push(processTurn(stateLog[stateLog.length - 1], turns[index]));
    }
  });

  const endState = stateLog[stateLog.length - 1];
  const orientationValues: Orientation[] = ["E", "S", "W", "N"];
  console.log(
      (endState.row + 1) * 1000 +
      (endState.column + 1) * 4 +
      orientationValues.findIndex(
          (orientation) => orientation === endState.orientation
      )
  );
}

function processSteps(
  currentState: PositionalState,
  map: Map,
  times: number,
  cubeProblem: boolean = false
): PositionalState {
  const newCurrentState = processStep(currentState, map, cubeProblem);
  if (
    currentState.row === newCurrentState.row &&
    currentState.column === newCurrentState.column
  ) {
    return newCurrentState;
  }
  if (times <= 1) {
    return newCurrentState;
  }
  return processSteps(newCurrentState, map, times - 1, cubeProblem);
}

function processTurn(
  currentState: PositionalState,
  turnCommand: TurnCommand
): PositionalState {
  const orientations: Orientation[] = ["N", "E", "S", "W"];
  const newIndex =
    (orientations.findIndex(
      (orientation) => currentState.orientation === orientation
    ) +
      (turnCommand === "L" ? 3 : 5)) %
    4;
  return {
    ...currentState,
    orientation: orientations[newIndex],
  };
}

// Take one step
function processStep(currentState: PositionalState, map: Map, cubeProblem: boolean = false): PositionalState {
  switch (currentState.orientation) {
    case "N":
      return stepNorth(currentState, map, cubeProblem);
    case "E":
      return stepEast(currentState, map, cubeProblem);
    case "S":
      return stepSouth(currentState, map, cubeProblem);
    case "W":
      return stepWest(currentState, map, cubeProblem);
  }
}

function transferCubeFace(currentState: PositionalState, map: Map): PositionalState {
  const newState = convertCubeFace(currentState);

  if(map[newState.row][newState.column] === "#") {
    return {...currentState};
  }
  return newState;
}

function stepNorth(currentState: PositionalState, map: Map, cubeProblem: boolean = false): PositionalState {
  if (
    currentState.row === 0 ||
    map[currentState.row - 1][currentState.column] === " "
  ) {
    if(cubeProblem) {
      return transferCubeFace(currentState, map);
    }
    const newIndex =
      map.length -
      1 -
      [...map].reverse().findIndex((row) => row[currentState.column] !== " ");
    if (map[newIndex][currentState.column] === "#") {
      return { ...currentState };
    }
    return {
      ...currentState,
      row: newIndex,
    };
  }

  if (map[currentState.row - 1][currentState.column] === "#") {
    return {
      ...currentState,
    };
  }

  return {
    ...currentState,
    row: currentState.row - 1,
  };
}

function stepSouth(currentState: PositionalState, map: Map, cubeProblem: boolean = false): PositionalState {
  if (
    currentState.row === map.length - 1 ||
    map[currentState.row + 1][currentState.column] === " "
  ) {
    if(cubeProblem) {
      return transferCubeFace(currentState, map);
    }
    const newIndex = map.findIndex((row) => row[currentState.column] !== " ");
    if (map[newIndex][currentState.column] === "#") {
      return { ...currentState };
    }
    return {
      ...currentState,
      row: newIndex,
    };
  }

  if (map[currentState.row + 1][currentState.column] === "#") {
    return {
      ...currentState,
    };
  }

  return {
    ...currentState,
    row: currentState.row + 1,
  };
}

function stepWest(currentState: PositionalState, map: Map, cubeProblem: boolean = false): PositionalState {
  if (
    currentState.column === 0 ||
    map[currentState.row][currentState.column - 1] === " "
  ) {
    if(cubeProblem) {
      return transferCubeFace(currentState, map);
    }
    const newIndex =
      map[currentState.row].length -
      1 -
      [...map[currentState.row]]
        .reverse()
        .findIndex((mapLocation) => mapLocation !== " ");

    if (map[currentState.row][newIndex] === "#") {
      return { ...currentState };
    }
    return {
      ...currentState,
      column: newIndex,
    };
  }

  if (map[currentState.row][currentState.column - 1] === "#") {
    return {
      ...currentState,
    };
  }

  return {
    ...currentState,
    column: currentState.column - 1,
  };
}

function stepEast(currentState: PositionalState, map: Map, cubeProblem: boolean = false): PositionalState {
  if (
    currentState.column === map[currentState.row].length - 1 ||
    map[currentState.row][currentState.column + 1] === " "
  ) {
    if(cubeProblem) {
      return transferCubeFace(currentState, map);
    }
    const newIndex = map[currentState.row].findIndex(
      (mapLocation) => mapLocation !== " "
    );
    if (map[currentState.row][newIndex] === "#") {
      return { ...currentState };
    }
    return {
      ...currentState,
      column: newIndex,
    };
  }

  if (map[currentState.row][currentState.column + 1] === "#") {
    return {
      ...currentState,
    };
  }

  return {
    ...currentState,
    column: currentState.column + 1,
  };
}

function convertCubeFace(currentState: PositionalState): PositionalState {
  // Row 0 Column 50 - 99 North
  if (
    currentState.row === 0 &&
    currentState.column >= 50 &&
    currentState.column <= 99 &&
    currentState.orientation === "N"
  ) {
    return {
      row: currentState.column + 100,
      column: 0,
      orientation: "E",
    };
  }

  // Row 0 Column 100 - 149 North
  if (
    currentState.row === 0 &&
    currentState.column >= 100 &&
    currentState.column <= 149 &&
    currentState.orientation === "N"
  ) {
    return {
      row: 199,
      column: currentState.column - 100,
      orientation: "N",
    };
  }

  // Row 49 Column 100 - 149 South
  if (
    currentState.row === 49 &&
    currentState.column >= 100 &&
    currentState.column <= 149 &&
    currentState.orientation === "S"
  ) {
    return {
      row: 49 + (currentState.column - 99),
      column: 99,
      orientation: "W",
    };
  }

  // Row 100 Column 0 - 49 North
  if (
    currentState.row === 100 &&
    currentState.column >= 0 &&
    currentState.column <= 49 &&
    currentState.orientation === "N"
  ) {
    return {
      row: 100 - (50 - currentState.column),
      column: 50,
      orientation: "E",
    };
  }

  // Row 149 Column 50 - 99 South
  if (
    currentState.row === 149 &&
    currentState.column >= 50 &&
    currentState.column <= 99 &&
    currentState.orientation === "S"
  ) {
    return {
      row: 149 + currentState.column - 49,
      column: 49,
      orientation: "W",
    };
  }

  // Row 199 Column 0 - 49 South
  if (
    currentState.row === 199 &&
    currentState.column >= 0 &&
    currentState.column <= 49 &&
    currentState.orientation === "S"
  ) {
    return {
      row: 0,
      column: 100 + currentState.column,
      orientation: "S",
    };
  }

  // Column 0 Row 100 - 149 West
  if (
    currentState.column === 0 &&
    currentState.row >= 100 &&
    currentState.row <= 149 &&
    currentState.orientation === "W"
  ) {
    return {
      row: 149 - currentState.row,
      column: 50,
      orientation: "E",
    };
  }

  // Column 0 Row 150 - 199 West
  if (
    currentState.column === 0 &&
    currentState.row >= 150 &&
    currentState.row <= 199 &&
    currentState.orientation === "W"
  ) {
    return {
      row: 0,
      column: currentState.row - 100,
      orientation: "S",
    };
  }

  // Column 49 Row 150 - 199 East
  if (
    currentState.column === 49 &&
    currentState.row >= 150 &&
    currentState.row <= 199 &&
    currentState.orientation === "E"
  ) {
    return {
      row: 149,
      column: currentState.row - 100,
      orientation: "N",
    };
  }

  // Column 50 Row 0 - 49 West
  if (
    currentState.column === 50 &&
    currentState.row >= 0 &&
    currentState.row <= 49 &&
    currentState.orientation === "W"
  ) {
    return {
      row: 149 - currentState.row,
      column: 0,
      orientation: "E",
    };
  }

  // Column 50 Row 50 - 99 West
  if (
    currentState.column === 50 &&
    currentState.row >= 50 &&
    currentState.row <= 99 &&
    currentState.orientation === "W"
  ) {
    return {
      row: 100,
      column: currentState.row - 50,
      orientation: "S",
    };
  }

  // Column 99 Row 50 - 99 East
  if (
    currentState.column === 99 &&
    currentState.row >= 50 &&
    currentState.row <= 99 &&
    currentState.orientation === "E"
  ) {
    return {
      row: 49,
      column: currentState.row + 50,
      orientation: "N",
    };
  }

  // Column 99 Row 100 - 149 East
  if (
    currentState.column === 99 &&
    currentState.row >= 100 &&
    currentState.row <= 149 &&
    currentState.orientation === "E"
  ) {
    return {
      row: 149 - currentState.row,
      column: 149,
      orientation: "W",
    };
  }

  // Column 149 Row 0 - 49 East
  if (
    currentState.column === 149 &&
    currentState.row >= 0 &&
    currentState.row <= 49 &&
    currentState.orientation === "E"
  ) {
    return {
      row: 149 - currentState.row,
      column: 99,
      orientation: "W",
    };
  }

  return {...currentState};
}
