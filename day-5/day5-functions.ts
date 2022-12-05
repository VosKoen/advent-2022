import parseInput from "../common/parseInput";

const crates = [
  "RNFVLJSM",
  "PNDZFJWH",
  "WRCDG",
  "NBS",
  "MZWPCBFN",
  "PRMW",
  "RTNGLSW",
  "QTHFNBV",
  "LMHZNF",
];

export async function runDay5a() {
  const inputArray = await parseInput(__dirname + "/input-5a");
  const moveInput = inputArray.map((line) => [
    parseInt(line.split(" ")[1], 10),
    parseInt(line.split(" ")[3], 10),
    parseInt(line.split(" ")[5], 10),
  ]);

  moveInput.forEach((move) => processMove(crates, move));
  console.log(crates);
}

export async function runDay5b() {
  const inputArray = await parseInput(__dirname + "/input-5a");
  const moveInput = inputArray.map((line) => [
    parseInt(line.split(" ")[1], 10),
    parseInt(line.split(" ")[3], 10),
    parseInt(line.split(" ")[5], 10),
  ]);

  moveInput.forEach((move) => processMove9001(crates, move));
  console.log(crates);
}

function processMove(array: string[], move: number[]): void {
  for (let i = 0; i < move[0]; i++) {
    const crateItem = array[move[1] - 1].charAt(array[move[1] - 1].length - 1);
    array[move[1] - 1] = array[move[1] - 1].slice(0, -1);
    array[move[2] - 1] = array[move[2] - 1] + crateItem;
  }
}

function processMove9001(array: string[], move: number[]): void {
  const crateItem = array[move[1] - 1].substring(
    array[move[1] - 1].length - move[0],
    array[move[1] - 1].length
  );
  array[move[1] - 1] = array[move[1] - 1].substring(
    0,
    array[move[1] - 1].length - move[0]
  );
  array[move[2] - 1] = array[move[2] - 1] + crateItem;
}
