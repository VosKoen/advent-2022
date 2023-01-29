import parseInput from "../common/parseInput";

export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const decimals = inputArray.map(snafuToDecimal);
  const totalDecimal = decimals.reduce((acc, val) => acc + val);
  console.log(decimalToSnafu(totalDecimal));
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
}

function snafuToDecimal(snafu: string): number {
  const snafuArray = snafu.split("").map((char) => {
    if (char === "=") {
      return -2;
    }
    if (char === "-") {
      return -1;
    }
    return parseInt(char, 10);
  });

  return [...snafuArray]
    .reverse()
    .map((snafuNumber, index) => snafuNumber * Math.pow(5, index))
    .reduce((acc, val) => acc + val);
}

const decimalToSnafuMap = new Array(25)
  .fill(0)
  .map((value, index) => Math.pow(5, index));

function decimalToSnafu(decimal: number): string {
  const snafuBase = decimalToSnafuMap.filter((value) => value / 2 < decimal);
  const snafuString: string[] = [];
  let remainder = decimal;
  [...snafuBase].reverse().forEach((base) => {
    if (Math.abs(remainder) < base / 2) {
      snafuString.push("0");
      return;
    }
    if (remainder > base / 2 && remainder < (base * 3) / 2) {
      snafuString.push("1");
      remainder -= base;
      return;
    }
    if (remainder < -base / 2 && remainder > (-base * 3) / 2) {
      snafuString.push("-");
      remainder += base;
      return;
    }
    if (remainder > (base * 3) / 2) {
      snafuString.push("2");
      remainder -= 2 * base;
      return;
    }
    if (remainder < (-base * 3) / 2) {
      snafuString.push("=");
      remainder += 2 * base;
      return;
    }
  });
  return snafuString.join("");
}
