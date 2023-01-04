import parseInput from "../common/parseInput";

export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const parsedInput = inputArray.map((line) =>
    line.split(",").map((value) => parseInt(value, 10))
  );
  const maxValue = Math.max(...parsedInput.map((cube) => Math.max(...cube)));

  // Create grid
  const grid: boolean[][][] = [];
  for (let i = 0; i <= maxValue + 2; i++) {
    grid.push([]);
    for (let j = 0; j <= maxValue + 2; j++) {
      grid[i].push(new Array(maxValue + 3).fill(false));
    }
  }

  // Form droplet
  parsedInput.forEach((cube) => {
    grid[cube[0]][cube[1]][cube[2]] = true;
  });

  // Go through droplet
  const surfaceArea = parsedInput.map((cube) => {
    const x = cube[0];
    const y = cube[1];
    const z = cube[2];
    let count = 0;
    if (grid[x + 1][y][z]) {
      count++;
    }
    if (x !== 0 && grid[x - 1][y][z]) {
      count++;
    }
    if (grid[x][y + 1][z]) {
      count++;
    }
    if (y !== 0 && grid[x][y - 1][z]) {
      count++;
    }
    if (grid[x][y][z + 1]) {
      count++;
    }
    if (z !== 0 && grid[x][y][z - 1]) {
      count++;
    }

    return 6 - count;
  });
  console.log(surfaceArea.reduce((acc, val) => acc + val));
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
  const parsedInput = inputArray.map((line) =>
    line.split(",").map((value) => parseInt(value, 10))
  );
  const maxValue = Math.max(...parsedInput.map((cube) => Math.max(...cube)));

  // Create grid
  const grid: boolean[][][] = [];
  for (let i = 0; i <= maxValue + 2; i++) {
    grid.push([]);
    for (let j = 0; j <= maxValue + 2; j++) {
      grid[i].push(new Array(maxValue + 3).fill(false));
    }
  }

  parsedInput.forEach((cube) => {
    grid[cube[0]][cube[1]][cube[2]] = true;
  });

  const surfaceArea = parsedInput.map((cube) => {
    const x = cube[0];
    const y = cube[1];
    const z = cube[2];
    let count = 0;
    if (grid[x + 1][y][z]) {
      count++;
    }
    if (x !== 0 && grid[x - 1][y][z]) {
      count++;
    }
    if (grid[x][y + 1][z]) {
      count++;
    }
    if (y !== 0 && grid[x][y - 1][z]) {
      count++;
    }
    if (grid[x][y][z + 1]) {
      count++;
    }
    if (z !== 0 && grid[x][y][z - 1]) {
      count++;
    }

    return 6 - count;
  });

  grid.forEach((surface, gridIndex) =>
    surface.forEach((line, surfaceIndex) =>
      line.forEach((cube, lineIndex) => {
        if (gridIndex === 0 || surfaceIndex === 0 || lineIndex === 0) {
          steamCube(grid, gridIndex, surfaceIndex, lineIndex);
        }
      })
    )
  );

  const cavetiesSurfaceArea = parsedInput.map((cube) => {
    const x = cube[0];
    const y = cube[1];
    const z = cube[2];
    let count = 0;
    if (grid[x + 1][y][z]) {
      count++;
    }
    if (x === 0 || grid[x - 1][y][z]) {
      count++;
    }
    if (grid[x][y + 1][z]) {
      count++;
    }
    if (y === 0 || grid[x][y - 1][z]) {
      count++;
    }
    if (grid[x][y][z + 1]) {
      count++;
    }
    if (z === 0 || grid[x][y][z - 1]) {
      count++;
    }

    return 6 - count;
  });

  console.log(surfaceArea.reduce((acc, val) => acc + val) - cavetiesSurfaceArea.reduce((acc, val) => acc + val));
}

function steamCube(grid: boolean[][][], x: number, y: number, z: number) {
  if (!grid[x][y][z]) {
    grid[x][y][z] = true;
    if (x !== 0) {
      steamCube(grid, x - 1, y, z);
    }
    if (x !== grid.length - 1) {
      steamCube(grid, x + 1, y, z);
    }
    if (y !== 0) {
      steamCube(grid, x, y - 1, z);
    }
    if (y !== grid.length - 1) {
      steamCube(grid, x, y + 1, z);
    }
    if (z !== 0) {
      steamCube(grid, x, y, z - 1);
    }
    if (z !== grid.length - 1) {
      steamCube(grid, x, y, z + 1);
    }
  }
}
