import parseInput from "../common/parseInput";

export async function runDay1a() {
  const inputArray = await parseInput(__dirname + "/input-1a");
  console.log(Math.max(...caloriesPerElf(inputArray)));
}

export async function runDay1b() {
  const inputArray = await parseInput(__dirname + "/input-1a");
  const caloriesDistribution = caloriesPerElf(inputArray);
  console.log(
    getTopValuesArray(caloriesDistribution, 3).reduce(
      (acc, val) => acc + val,
      0
    )
  );
}

function caloriesPerElf(inputArray: string[]): number[] {
  const caloriesPerElf = [];
  caloriesPerElf.push(
    inputArray.reduce((accumulator: number, inputValue: string) => {
      if (inputValue === "") {
        caloriesPerElf.push(accumulator);
        return 0;
      }
      return accumulator + parseInt(inputValue, 10);
    }, 0)
  );
  return caloriesPerElf;
}

export function getTopValuesArray(array: number[], numberOfValues: number): number[] {
  const topValues: number[] = Array(numberOfValues);
  topValues.fill(0);
  array.forEach((value) => {
    const minTopValue = Math.min(...topValues);
    if (value > minTopValue) {
      const index = topValues.findIndex((topValue) => topValue === minTopValue);
      topValues[index] = value;
    }
  });
  return topValues;
}
