import parseInput from "../common/parseInput";

export async function runDay6a() {
  const inputString = (await parseInput(__dirname + "/input-6"))[0];
  console.log(findFirstDistinctCharIndex(inputString, 4) + 1);
}

export async function runDay6b() {
  const inputString = (await parseInput(__dirname + "/input-6"))[0];
  console.log(findFirstDistinctCharIndex(inputString, 14) + 1);
}

function findFirstDistinctCharIndex(
  packet: string,
  noCharacters: number
): number {
  return packet
    .split("")
    .findIndex(
      (element, currentIndex, array) =>
        currentIndex >= noCharacters - 1 &&
        hasUniqueValues(
          array.slice(currentIndex - noCharacters + 1, currentIndex + 1)
        )
    );
}

function hasUniqueValues(array: string[]): boolean {
  return (
    array
      .map((element) => array.filter((el) => el === element).length)
      .filter((noOfOccurences) => noOfOccurences !== 1).length === 0
  );
}
