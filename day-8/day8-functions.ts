import parseInput from "../common/parseInput";

export async function runDay8a() {
  const inputArray = await parseInput(__dirname + "/input-8");
  const forest = inputArray.map((row) =>
    row.split("").map((tree) => parseInt(tree, 10))
  );
  const visibleTreesGrid = forest.map((treeLine, row) =>
    treeLine.map((tree, column): number =>
      isTreeVisible(forest, row, column) ? 1 : 0
    )
  );
  console.log(visibleTreesGrid);
  console.log(
    visibleTreesGrid
      .map((treeLine) => treeLine.reduce((acc, val) => acc + val))
      .reduce((acc, val) => acc + val)
  );
}
export async function runDay8b() {
  const inputArray = await parseInput(__dirname + "/input-8");
  const forest = inputArray.map((row) =>
    row.split("").map((tree) => parseInt(tree, 10))
  );
  const scenicScoreGrid = forest.map((treeline, row) =>
    treeline.map((tree, column) => calculateScenicScore(forest, row, column))
  );
  console.log(
      scenicScoreGrid
          .map((treeLine) => treeLine.reduce((acc, val) => acc < val ? val : acc))
          .reduce((acc, val) => acc < val ? val : acc)
  );
}

function isTreeVisible(
  forest: number[][],
  row: number,
  column: number
): boolean {
  return (
    isTreeVisibleInRow(forest, row, column) ||
    isTreeVisibleInColumn(forest, row, column)
  );
}

function isTreeVisibleInRow(
  forest: number[][],
  row: number,
  column: number
): boolean {
  const treeLength = forest[row][column];
  return (
    forest[row].filter((tree, index) => tree >= treeLength && index < column)
      .length === 0 ||
    forest[row].filter((tree, index) => tree >= treeLength && index > column)
      .length === 0
  );
}
function isTreeVisibleInColumn(
  forest: number[][],
  row: number,
  column: number
): boolean {
  const treeLength = forest[row][column];
  const rowLines = forest.map((rowLine) => rowLine[column]);
  return (
    rowLines.filter((tree, index) => tree >= treeLength && index < row)
      .length === 0 ||
    rowLines.filter((tree, index) => tree >= treeLength && index > row)
      .length === 0
  );
}

function calculateScenicScore(
  forest: number[][],
  row: number,
  column: number
): number {
  const rowLines = forest.map((rowLine) => rowLine[column]);

  return (
    getViewLeft(forest[row], column) *
    getViewLeft(rowLines, row) *
    getViewRight(forest[row], column) *
    getViewRight(rowLines, row)
  );
}

function getViewLeft(treeLine: number[], index: number): number {
  const treeLength = treeLine[index];
  if (index === 0) {
    return 0;
  }
  let score = 0;
  for (let i = index - 1; i >= 0; i--) {
    score++;
    if (treeLine[i] >= treeLength) {
      return score;
    }
  }
  return score;
}

function getViewRight(treeLine: number[], index: number): number {
  return getViewLeft([...treeLine].reverse(), treeLine.length - index - 1);
}
