import parseInput from "../common/parseInput";

export async function runDay4a() {
  const inputArray = await parseInput(__dirname + "/input-4a");
  console.log(
    inputArray
      .map((line) => line.split(","))
      .map((line) => hasFullyContainedPair(line))
      .filter((contained) => contained).length
  );
}
export async function runDay4b() {
  const inputArray = await parseInput(__dirname + "/input-4a");
  console.log(
    inputArray
      .map((line) => line.split(","))
      .map((line) => haveSomeOverlap(line))
      .filter((contained) => contained).length
  );
}

function hasFullyContainedPair(pairs: string[]): boolean {
  return (
    isAContainedByB(pairs[0], pairs[1]) || isAContainedByB(pairs[1], pairs[0])
  );
}

function isAContainedByB(pairA: string, pairB: string): boolean {
  const edgesA = pairA.split("-").map((value) => parseInt(value, 10));
  const edgesB = pairB.split("-").map((value) => parseInt(value, 10));

  return edgesA[0] >= edgesB[0] && edgesA[1] <= edgesB[1];
}

function haveSomeOverlap(pairs: string[]): boolean {
  const edgesA = pairs[0].split("-").map((value) => parseInt(value, 10));
  const edgesB = pairs[1].split("-").map((value) => parseInt(value, 10));

  return edgesA[1] >= edgesB[0] && edgesA[0] <= edgesB[1];
}
