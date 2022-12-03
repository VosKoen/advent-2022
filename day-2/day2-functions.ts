import parseInput from "../common/parseInput";

export async function runDay2a() {
  const inputArray = await parseInput(__dirname + "/input-2a");

  console.log(
    inputArray
      .map((move) => calculatePointsForMove(move))
      .reduce((acc, result) => acc + result)
  );
}
export async function runDay2b() {
  const inputArray = await parseInput(__dirname + "/input-2a");
  console.log(
    inputArray
      .map((strategy) => convertResultDesireToMove(strategy))
      .map((move) => calculatePointsForMove(move))
      .reduce((acc, result) => acc + result)
  );
}

function convertResultDesireToMove(strategy: string): string {
  const move = {
    AX: "A Z",
    BX: "B X",
    CX: "C Y",
    AY: "A X",
    BY: "B Y",
    CY: "C Z",
    AZ: "A Y",
    BZ: "B Z",
    CZ: "C X",
  };
  return move[strategy.split(" ").join("") as keyof typeof move];
}

function calculatePointsForMove(move: string): number {
  const points = {
    AX: 4,
    BX: 1,
    CX: 7,
    AY: 8,
    BY: 5,
    CY: 2,
    AZ: 3,
    BZ: 9,
    CZ: 6,
  };
  return points[move.split(" ").join("") as keyof typeof points];
}
