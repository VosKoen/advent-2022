import parseInput from "../common/parseInput";

export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const parsedInput = inputArray.map((line) =>
    line
      .split(" -> ")
      .map((coordinateSet) =>
        coordinateSet.split(",").map((coordinate) => parseInt(coordinate, 10))
      )
  );
  const grid = createGrid(parsedInput);
  let continueSand = true;
  while (continueSand) {
    continueSand = processFall(grid, [0, 500]);
  }
  displayGrid(grid.map((row) => row.slice(300, 700)));
  let sandCount = 0;
  grid.forEach((row) =>
    row.forEach((position) => {
      if (position === "o") {
        sandCount++;
      }
    })
  );
  console.log(sandCount);
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
  const parsedInput = inputArray.map((line) =>
    line
      .split(" -> ")
      .map((coordinateSet) =>
        coordinateSet.split(",").map((coordinate) => parseInt(coordinate, 10))
      )
  );
  const grid = createGrid(parsedInput);
  grid[grid.length-1].forEach((el, index) => grid[grid.length-1][index] = '#');

  while (grid[0][500] === '.') {
    processFall(grid, [0, 500]);
  }
  displayGrid(grid.map((row) => row.slice(400, 620)));
  let sandCount = 0;
  grid.forEach((row) =>
    row.forEach((position) => {
      if (position === "o") {
        sandCount++;
      }
    })
  );
  console.log(sandCount);
}

function createGrid(parsedInput: number[][][]) {
  const highestFloorValue = Math.max(
    ...parsedInput.map((path) =>
      Math.max(...path.map((coordinateSets) => coordinateSets[1]))
    )
  );
  const grid: string[][] = new Array(highestFloorValue + 3)
    .fill(".")
    .map((row) => new Array(1000).fill("."));
  parsedInput.forEach((path) => drawPath(grid, path));
  return grid;
}

function drawPath(grid: string[][], path: number[][]) {
  for (let i = 1; i < path.length; i++) {
    const difference = [
      path[i][1] - path[i - 1][1],
      path[i][0] - path[i - 1][0],
    ];
    grid[path[i - 1][1]][path[i - 1][0]] = "#";
    grid[path[i][1]][path[i][0]] = "#";
    for (let j = 0; j < Math.abs(difference[0]); j++) {
      grid[path[i - 1][1] + (difference[0] / Math.abs(difference[0])) * j][
        path[i - 1][0]
      ] = "#";
    }
    for (let j = 0; j < Math.abs(difference[1]); j++) {
      grid[path[i - 1][1]][
        path[i - 1][0] + (difference[1] / Math.abs(difference[1])) * j
      ] = "#";
    }
  }
}

function displayGrid(grid: string[][]) {
  console.log("");
  grid.forEach((row) => console.log(row.join("")));
}

function processFall(grid: string[][], coordinates: [number, number]): boolean {
  if (coordinates[0] > grid.length - 2) {
    return false;
  }
  if (grid[coordinates[0] + 1][coordinates[1]] === ".") {
    return processFall(grid, [coordinates[0] + 1, coordinates[1]]);
  } else if (grid[coordinates[0] + 1][coordinates[1] - 1] === ".") {
    return processFall(grid, [coordinates[0] + 1, coordinates[1] - 1]);
  } else if (grid[coordinates[0] + 1][coordinates[1] + 1] === ".") {
    return processFall(grid, [coordinates[0] + 1, coordinates[1] + 1]);
  } else {
    grid[coordinates[0]][coordinates[1]] = "o";
    return true;
  }
}
