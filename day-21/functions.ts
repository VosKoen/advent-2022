import parseInput from "../common/parseInput";

export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const parsedInput = inputArray.map((monkey) => {
    const splitMonkey = monkey.split(": ");
    const value = /\d/.test(splitMonkey[1])
      ? parseInt(splitMonkey[1], 10)
      : splitMonkey[1];
    return {
      name: splitMonkey[0],
      value,
    };
  });

  const root = parsedInput.find((monkey) => monkey.name === "root") as {name: string, value: string};
  root.value = root.value.replace('+', '-');

  while (root && typeof root.value === "string") {
    parsedInput.forEach((monkey) => processMonkey(monkey, parsedInput));
  }

  console.log(parsedInput.find((monkey) => monkey.name === "root"));
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
  const parsedInput = inputArray.map((monkey) => {
    const splitMonkey = monkey.split(": ");
    const value = /\d/.test(splitMonkey[1])
      ? parseInt(splitMonkey[1], 10)
      : splitMonkey[1];
    return {
      name: splitMonkey[0],
      value,
    };
  });

  const root = parsedInput.find((monkey) => monkey.name === "root") as {name: string, value: string};
  root.value = root.value.replace('+', '-');

  let variables = ["humn"];
  const humn = parsedInput.find((monkey) => monkey.name === "humn")!;
  humn.value = "x";
  while (!variables.includes('root')) {
    parsedInput.forEach((monkey) =>
      processMonkeyB(monkey, variables, parsedInput)
    );
  }
  if(typeof root.value === 'string' ) {
    for(let i = 0; i<= 999999; i++) {
      if(i%1000 === 0) {
        console.log(i);
      }
      const test = root.value.replace('x', (i*10000000).toString(10));
      if(eval(test) < 0) {
        for(let j = 0; j<= 10000000; j++) {
          const test = root.value.replace('x', ((i-1)*10000000+j).toString(10));
          if(j%1000 === 0) {
            console.log(j, eval(test));
          }
          if(eval(test) === 0) {
            console.log((i-1)*10000000+j);
            break;
          }
        }
        break;
      }
    }
  }
}

function processMonkey(
  monkey: { name: string; value: string | number },
  allMonkeys: { name: string; value: string | number }[]
) {
  if (typeof monkey.value === "number") {
    return;
  }
  const monkeyValueSplit = monkey.value.split(" ");
  const monkey1 = allMonkeys.find(
    (haystackMonkey) => haystackMonkey.name === monkeyValueSplit[0]
  )!;
  const monkey2 = allMonkeys.find(
    (haystackMonkey) => haystackMonkey.name === monkeyValueSplit[2]
  )!;

  if (typeof monkey1.value === "number" && typeof monkey2.value === "number") {
    monkey.value = parseInt(
      eval(`${monkey1.value} ${monkeyValueSplit[1]} ${monkey2.value}`),
      10
    );
  }
}

function processMonkeyB(
  monkey: { name: string; value: string | number | boolean },
  variables: string[],
  allMonkeys: { name: string; value: string | number | boolean }[]
): string[] {

  if (typeof monkey.value === "number" || typeof monkey.value === "boolean") {
    return variables;
  }

  if (variables.includes(monkey.name)) {
    return variables;
  }

  const monkeyValues = monkey.value.match(/([A-Z,a-z]{4})/g);
  if(monkeyValues === null) {
    variables.push(monkey.name);
    return variables;
  }
  monkeyValues.forEach(monkeyToReplace => {
    const monkeyFound = allMonkeys.find(monkeyToFind => monkeyToFind.name === monkeyToReplace);
    if(typeof monkey.value === 'string' && monkeyFound) {
      monkey.value = monkey.value.replace(monkeyToReplace, `(${monkeyFound.value.toString()})`);
    }
  });

  return variables;
}
