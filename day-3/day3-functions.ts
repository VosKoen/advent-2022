import parseInput from "../common/parseInput";

export async function runDay3a() {
  const inputArray = await parseInput(__dirname + "/input-3a");
  const result = inputArray
    .map((string) => splitString(string))
    .map((splitString) =>
      findUniqueSharedLetters(splitString[0], splitString[1])
    );
  console.log(calculateSumPriority(result.join()));
}

export async function runDay3b() {
  const inputArray = await parseInput(__dirname + "/input-3a");
  const badges: string[] = [];

  for(let i = 0; i<inputArray.length/3; i++) {
    badges.push(findBadgeForGroup(inputArray.slice(3*i,3*i+3)));
  }
  console.log(calculateSumPriority(badges.join()));
}

function findBadgeForGroup(group: string[]): string {
  return group[0]
    .split("")
    .find(
      (character) =>
        group[1].includes(character) && group[2].includes(character)
    ) as string;
}

function splitString(toSplit: string): [string, string] {
  return [
    toSplit.substring(0, toSplit.length / 2),
    toSplit.substring(toSplit.length / 2),
  ];
}

function findUniqueSharedLetters(string_1: string, string_2: string): string {
  const shared = string_1
    .split("")
    .filter((character) => string_2.split("").includes(character));

  const unique: string[] = [];
  shared.forEach((character) => {
    if (!unique.includes(character)) {
      unique.push(character);
    }
  });

  return unique.join();
}

function calculateSumPriority(items: string): number {
  const itemsSortedByPriority =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const priorityArray = itemsSortedByPriority.split("");
  return items
    .split("")
    .map(
      (item) =>
        priorityArray.findIndex((priorityItem) => priorityItem === item) + 1
    )
    .reduce((acc, val) => acc + val, 0);
}
