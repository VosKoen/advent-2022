import parseInput from "../common/parseInput";

export async function runA() {
  const original = (await parseInput(__dirname + "/input")).map((line) =>
    parseInt(line, 10)
  );
  const dynamicFile = original.map((value, originalIndex) => ({
    value,
    originalIndex,
  }));
  original.forEach((item, index) => {
    const currentIndex = dynamicFile.findIndex(
      (entry) => entry.originalIndex === index
    );
    const file = dynamicFile.splice(currentIndex, 1)[0];
    let newIndex: number;
    if (currentIndex + file.value < 0) {
      newIndex = dynamicFile.length + (currentIndex + file.value);
    } else {
      newIndex = (currentIndex + file.value) % dynamicFile.length;
    }
    dynamicFile.splice(newIndex, 0, file);
  });

  const startIndex = dynamicFile.findIndex((item) => item.value === 0);

  const firstValue =
    dynamicFile[(1000 + startIndex) % dynamicFile.length].value;
  const secondValue =
    dynamicFile[(2000 + startIndex) % dynamicFile.length].value;
  const thirdValue =
    dynamicFile[(3000 + startIndex) % dynamicFile.length].value;

  console.log(firstValue + secondValue + thirdValue);
}

export async function runB() {
  const original = (await parseInput(__dirname + "/input")).map(
    (line) => parseInt(line, 10) * 811589153
  );
  const dynamicFile = original.map((value, originalIndex) => ({
    value,
    originalIndex,
  }));
  for(let i = 0; i < 10; i++) {
    original.forEach((item, index) => {
      const currentIndex = dynamicFile.findIndex(
          (entry) => entry.originalIndex === index
      );
      const file = dynamicFile.splice(currentIndex, 1)[0];
      let newIndex: number;
      if (currentIndex + file.value < 0) {
        newIndex =
            dynamicFile.length + ((currentIndex + file.value) % dynamicFile.length);
      } else {
        newIndex = (currentIndex + file.value) % dynamicFile.length;
      }
      dynamicFile.splice(newIndex, 0, file);
    });
  }
  const startIndex = dynamicFile.findIndex(item => item.value === 0);

  const firstValue = dynamicFile[(1000+startIndex) % dynamicFile.length].value;
  const secondValue = dynamicFile[(2000+startIndex) % dynamicFile.length].value;
  const thirdValue = dynamicFile[(3000+startIndex) % dynamicFile.length].value;

  console.log(firstValue + secondValue + thirdValue);
}
