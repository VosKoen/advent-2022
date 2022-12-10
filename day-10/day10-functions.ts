import parseInput from "../common/parseInput";

export async function runDay10a() {
  const inputArray = await parseInput(__dirname + "/input-10");
  const resultArray = [1];
  inputArray.forEach((line) => {
    const currentX = resultArray[resultArray.length - 1];
    if (line === "noop") {
      resultArray.push(currentX);
    } else {
      resultArray.push(currentX);
      resultArray.push(currentX + parseInt(line.split(" ")[1], 10));
    }
  });
  console.log(resultArray);
  const signals = [
    20 * resultArray[19],
    60 * resultArray[59],
    100 * resultArray[99],
    140 * resultArray[139],
    180 * resultArray[179],
    220 * resultArray[219],
  ];
  console.log(signals.reduce((acc, val) => acc + val));
}

export async function runDay10b() {
  const inputArray = await parseInput(__dirname + "/input-10");
  const resultScreen: string[][] = [];
  const screen = Array(6).fill(Array(40).fill('.'));
  const cursor = [0,0];
  let currentX = 1;
  inputArray.forEach((line) => {
    if (line === "noop") {
      if(cursor[1] >= currentX -1 && cursor[1] <= currentX +1) {
        screen[cursor[0]][cursor[1]] = '#';
      } else {
        screen[cursor[0]][cursor[1]] = '.';
      }
      if(cursor[1] !== 39) {
        cursor[1]++;
      } else {
        cursor[1] = 0;
        if(cursor[0] !== 5) {
          resultScreen.push([...screen[cursor[0]]]);
          cursor[0]++;
        } else {
          cursor[0] = 0;
        }
      }
    } else {
      if(cursor[1] >= currentX -1 && cursor[1] <= currentX +1) {
        screen[cursor[0]][cursor[1]] = '#';
      } else {
        screen[cursor[0]][cursor[1]] = '.';
      }
      if(cursor[1] !== 39) {
        cursor[1]++;
      } else {
        cursor[1] = 0;
        if(cursor[0] !== 5) {
          resultScreen.push([...screen[cursor[0]]]);
          cursor[0]++;
        } else {
          cursor[0] = 0;
        }
      }
      if(cursor[1] >= currentX -1 && cursor[1] <= currentX +1) {
        screen[cursor[0]][cursor[1]] = '#';
      } else {
        screen[cursor[0]][cursor[1]] = '.';
      }
      if(cursor[1] !== 39) {
        cursor[1]++;
      } else {
        cursor[1] = 0;
        if(cursor[0] !== 5) {
          resultScreen.push([...screen[cursor[0]]]);
          cursor[0]++;
        } else {
          cursor[0] = 0;
        }
      }
      currentX += parseInt(line.split(" ")[1], 10);
    }
  });
  resultScreen.push([...screen[5]]);
  resultScreen.forEach(line => console.log(line.join('')));
}
