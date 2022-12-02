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
  const strategyParts = strategy.split(" ");
  const opponentMove = strategyParts[0];
  const resultDesire = strategyParts[1];

  let ownMove;

  switch (opponentMove) {
    case "A":
      switch (resultDesire) {
        case "X":
          ownMove = "Z";
          break;
        case "Y":
          ownMove = "X";
          break;
        case "Z":
          ownMove = "Y";
          break;
      }
      break;
    case "B":
      switch (resultDesire) {
        case "X":
          ownMove = "X";
          break;
        case "Y":
          ownMove = "Y";
          break;
        case "Z":
          ownMove = "Z";
          break;
      }
      break;
    case "C":
      switch (resultDesire) {
        case "X":
          ownMove = "Y";
          break;
        case "Y":
          ownMove = "Z";
          break;
        case "Z":
          ownMove = "X";
          break;
      }
      break;
  }

  return `${opponentMove} ${ownMove}`;
}

function calculatePointsForMove(move: string): number {
  const moves = move.split(" ");
  const opponentMove = moves[0];
  const ownMove = moves[1];
  let pointsOwnMove = 0;
  let pointsResult = 0;

  switch (ownMove) {
    case "X":
      pointsOwnMove = 1;
      switch (opponentMove) {
        case "A":
          pointsResult = 3;
          break;
        case "B":
          pointsResult = 0;
          break;
        case "C":
          pointsResult = 6;
          break;
      }
      break;
    case "Y":
      pointsOwnMove = 2;
      switch (opponentMove) {
        case "A":
          pointsResult = 6;
          break;
        case "B":
          pointsResult = 3;
          break;
        case "C":
          pointsResult = 0;
          break;
      }
      break;
    case "Z":
      pointsOwnMove = 3;
      switch (opponentMove) {
        case "A":
          pointsResult = 0;
          break;
        case "B":
          pointsResult = 6;
          break;
        case "C":
          pointsResult = 3;
          break;
      }
      break;
  }
  return pointsResult + pointsOwnMove;
}
