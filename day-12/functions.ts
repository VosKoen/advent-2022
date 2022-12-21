import parseInput from "../common/parseInput";

const pathsToProcess: [number, number, number][] = [];
export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const map = createMap(inputArray);

  const locationS = getLocationS(map);
  const locationE = getLocationE(map);
  const noOfStepsMap = createNoStepsMap(map);

  setLocation(noOfStepsMap, locationE, 0);
  processCurrentLocation(noOfStepsMap, map, locationE);

  displayMap(noOfStepsMap);
  console.log(noOfStepsMap[locationS[0]][locationS[1]]);
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
  const map = createMap(inputArray);

  const locationE = getLocationE(map);
  const noOfStepsMap = createNoStepsMap(map);

  setLocation(noOfStepsMap, locationE, 0);
  processCurrentLocation(noOfStepsMap, map, locationE);

  const position = getQuickestGroundLevel(map, noOfStepsMap);
  console.log(position);
  console.log(noOfStepsMap[position[0]][position[1]]);
}

function createMap(input: string[]): number[][] {
  const mapWithLetters = input.map((line) => line.split(""));
  return mapWithLetters.map((row) =>
    row.map((letter) => convertLetterToNumber(letter))
  );
}

function convertLetterToNumber(letter: string): number {
  const elevations = "abcdefghijklmnopqrstuvwxyz".split("");
  if (letter === "S") {
    return -1;
  }
  if (letter === "E") {
    return 100;
  }
  return elevations.findIndex((elevation) => letter === elevation);
}

function getLocationE(map: number[][]): [number, number] {
  const rowIndex = map.findIndex((row) => row.includes(100));
  if (rowIndex === -1) {
    return [-1, -1];
  }
  const columnIndex = map[rowIndex].findIndex((value) => value === 100);
  return [rowIndex, columnIndex];
}

function getLocationS(map: number[][]): [number, number] {
  const rowIndex = map.findIndex((row) => row.includes(-1));
  if (rowIndex === -1) {
    return [-1, -1];
  }
  const columnIndex = map[rowIndex].findIndex((value) => value === -1);
  return [rowIndex, columnIndex];
}

function createNoStepsMap(map: number[][]): number[][] {
  // Get locations S and E and then convert locations to the actual elevations
  const locationS = getLocationS(map);
  const locationE = getLocationE(map);
  if (locationS[0] !== -1) {
    setLocation(map, locationS, 0);
  }
  if (locationE[0] !== -1) {
    setLocation(map, locationE, 25);
  }

  // Initialize noStepsMap
  const noStepsMap = [];
  for (let i = 0; i < map.length; i++) {
    noStepsMap.push(new Array(map[0].length).fill(999999));
  }

  return noStepsMap;
}

function setLocation(
  map: number[][],
  location: [number, number],
  value: number
): void {
  map[location[0]][location[1]] = value;
}

function processCurrentLocation(
  noStepsMap: number[][],
  elevationMap: number[][],
  location: [number, number]
): void {
  const stepsToE = noStepsMap[location[0]][location[1]];

  if (
    location[0] !== 0 &&
    isMovePossible(elevationMap, location, [location[0] - 1, location[1]])
  ) {
    evaluateLocation(
      noStepsMap,
      elevationMap,
      [location[0] - 1, location[1]],
      stepsToE
    );
  }
  if (
    location[1] !== 0 &&
    isMovePossible(elevationMap, location, [location[0], location[1] - 1])
  ) {
    evaluateLocation(
      noStepsMap,
      elevationMap,
      [location[0], location[1] - 1],
      stepsToE
    );
  }
  if (
    location[0] < elevationMap.length - 1 &&
    isMovePossible(elevationMap, location, [location[0] + 1, location[1]])
  ) {
    evaluateLocation(
      noStepsMap,
      elevationMap,
      [location[0] + 1, location[1]],
      stepsToE
    );
  }
  if (
    location[1] < elevationMap[0].length - 1 &&
    isMovePossible(elevationMap, location, [location[0], location[1] + 1])
  ) {
    evaluateLocation(
      noStepsMap,
      elevationMap,
      [location[0], location[1] + 1],
      stepsToE
    );
  }

  if (pathsToProcess.length > 0) {
    const locationToProcess = selectPathToProcess();

    processCurrentLocation(noStepsMap, elevationMap, locationToProcess);
  }
}

function evaluateLocation(
  noStepsMap: number[][],
  elevationMap: number[][],
  location: [number, number],
  stepsToEFromLocation: number
): void {
  // If no steps to E on the previous location is bigger or equal than this location, then don't change this location
  // If no steps at evaluate is one bigger, then there is also no advantage and this location has been evaluated so don't change this location
  if (
    stepsToEFromLocation >= noStepsMap[location[0]][location[1]] ||
    stepsToEFromLocation === noStepsMap[location[0]][location[1]] + 1 // I know it can be combined but I like this more because it conveys a specific meaning
  ) {
    return;
  }
  setLocation(noStepsMap, location, stepsToEFromLocation + 1);
  storePathOption(location, stepsToEFromLocation + 1);
}

function isMovePossible(
  elevationMap: number[][],
  from: [number, number],
  to: [number, number]
) {
  return elevationMap[from[0]][from[1]] - elevationMap[to[0]][to[1]] <= 1;
}

function displayMap(map: number[][]): void {
  const displayMap = map.map((row) =>
    row.map((value) => (value === 999999 ? 0 : value))
  );
  displayMap.forEach((row) => console.log(row.join(" ")));
}

function storePathOption(location: [number, number], steps: number): void {
  const storeIndex = pathsToProcess.findIndex(
    (path) => path[0] === location[0] && path[1] === location[1]
  );
  if (storeIndex === -1) {
    pathsToProcess.push([location[0], location[1], steps]);
  } else {
    pathsToProcess[storeIndex] = [location[0], location[1], steps];
  }
}

function selectPathToProcess(): [number, number] {
  const pathToProcess = pathsToProcess.reduce(
    (acc, val) => (acc[2] <= val[2] ? acc : val),
    [0, 0, 9999999]
  );
  const indexOfProcessedPath = pathsToProcess.findIndex(
    (path) => path[0] === pathToProcess[0] && path[1] === pathToProcess[1]
  );
  pathsToProcess.splice(indexOfProcessedPath, 1);
  return [pathToProcess[0], pathToProcess[1]];
}
function getQuickestGroundLevel(
  elevationMap: number[][],
  noOfStepsMap: number[][]
): [number, number] {
  const coordinates = getAllCoordinatesForElevation(elevationMap, 0);
  return coordinates.reduce((acc, val) =>
    noOfStepsMap[acc[0]][acc[1]] <= noOfStepsMap[val[0]][val[1]] ? acc : val
  );
}

function getAllCoordinatesForElevation(
  elevationMap: number[][],
  desiredElevation: number
): [number, number][] {
  const returnArray: [number, number][] = [];
  elevationMap.forEach((row, rowIndex) =>
    row.forEach((elevation, columnIndex) => {
      if (desiredElevation === elevation) {
        returnArray.push([rowIndex, columnIndex]);
      }
    })
  );
  return returnArray;
}
