import parseInput from "../common/parseInput";

type Move = [string, number];
type Position = [number, number];
export async function runDay9a() {
  const moves = await getMoves();
  const initialPosition: Position = [0,0];
  let headPosition = initialPosition;
  const tailPositions = [initialPosition];
  moves.forEach(move => {
    let tailPosition;
    for (let i = 0; i < move[1]; i++) {
      [headPosition, tailPosition] = processMove(move[0], headPosition, tailPositions[tailPositions.length - 1]);
      tailPositions.push(tailPosition);
    }
  })
  const resultArray: Position[] = [];
  tailPositions.forEach(position => {
    if(resultArray.filter(element => element[0] === position[0] && element[1] === position[1]).length === 0) {
      resultArray.push(position);
    }
  })
  console.log(resultArray.length);
}
export async function runDay9b() {
  const moves = await getMoves();
  const initialPosition: Position = [0,0];
  let headPosition = initialPosition;
  let tail1Position = initialPosition;
  let tail2Position = initialPosition;
  let tail3Position = initialPosition;
  let tail4Position = initialPosition;
  let tail5Position = initialPosition;
  let tail6Position = initialPosition;
  let tail7Position = initialPosition;
  let tail8Position = initialPosition;
  const tailPositions = [initialPosition];
  moves.forEach(move => {
    let tail9Position;
    for (let i = 0; i < move[1]; i++) {
      [headPosition, tail1Position] = processMove(move[0], headPosition,  tail1Position);
      tail2Position = processTailMove(tail1Position,  tail2Position);
      tail3Position = processTailMove(tail2Position,  tail3Position);
      tail4Position = processTailMove(tail3Position,  tail4Position);
      tail5Position = processTailMove(tail4Position,  tail5Position);
      tail6Position = processTailMove(tail5Position,  tail6Position);
      tail7Position = processTailMove(tail6Position,  tail7Position);
      tail8Position = processTailMove(tail7Position,  tail8Position);
      tail9Position = processTailMove(tail8Position,  tailPositions[tailPositions.length-1]);
      tailPositions.push(tail9Position);
    }
  })
  const resultArray: Position[] = [];
  tailPositions.forEach(position => {
    if(resultArray.filter(element => element[0] === position[0] && element[1] === position[1]).length === 0) {
      resultArray.push(position);
    }
  })
  console.log(resultArray.length);
}

async function getMoves(): Promise<Move[]> {
  const inputArray = await parseInput(__dirname + "/input-9");
  return inputArray.map((line) => {
    const lineSplit = line.split(" ");
    return [lineSplit[0], parseInt(lineSplit[1], 10)];
  });
}

function processMove(
  move: string,
  oldHeadPosition: Position,
  oldTailPosition: Position,
): [Position, Position] {
  let newHeadPosition: Position = [0,0];
  switch (move) {
    case "R":
      newHeadPosition = [oldHeadPosition[0] + 1, oldHeadPosition[1]];
      break;
    case "U":
      newHeadPosition = [oldHeadPosition[0], oldHeadPosition[1] + 1];
      break;
    case "L":
      newHeadPosition = [oldHeadPosition[0] - 1, oldHeadPosition[1]];
      break;
    case "D":
      newHeadPosition = [oldHeadPosition[0], oldHeadPosition[1] - 1];
      break;
  }

  return [newHeadPosition, processTailMove(newHeadPosition, oldTailPosition)];
}

function processTailMove(headPosition: Position, oldTailPosition: Position): Position {
  const positionalDifference = [headPosition[0] - oldTailPosition[0], headPosition[1] - oldTailPosition[1]];
  const newTailPosition: Position = [...oldTailPosition];
  if(Math.abs(positionalDifference[0]) > 1 || Math.abs(positionalDifference[1]) > 1) {
    newTailPosition[0] += positionalDifference[0] === 0 ? 0 : positionalDifference[0]/Math.abs(positionalDifference[0]);
    newTailPosition[1] += positionalDifference[1] === 0 ? 0 : positionalDifference[1]/Math.abs(positionalDifference[1]);
  }
  return newTailPosition;
}
