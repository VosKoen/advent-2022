import parseInput from "../common/parseInput";

const bestResults = new Array(50).fill(0);

export async function runA() {
  const inputArray = await parseInput(__dirname + "/input");
  const parsedInput = inputArray.map((line) => {
    const splitLine = line.split(" ").map((value) => parseInt(value, 10));
    return [
      splitLine[6],
      splitLine[12],
      splitLine[18],
      splitLine[21],
      splitLine[27],
      splitLine[30],
    ];
  });
  const qualityLevels = parsedInput.map(
    (costs, index) => (index + 1) * determineMaxGeodes(costs)
  );
  console.log(qualityLevels);
  console.log(qualityLevels.reduce((acc, val) => acc + val));
}

export async function runB() {
  const inputArray = await parseInput(__dirname + "/input");
  const parsedInput = inputArray
    .map((line) => {
      const splitLine = line.split(" ").map((value) => parseInt(value, 10));
      return [
        splitLine[6],
        splitLine[12],
        splitLine[18],
        splitLine[21],
        splitLine[27],
        splitLine[30],
      ];
    })
    .filter((line, index) => index < 3);
  const maxGeodes = parsedInput.map((costs) => {
    console.log(costs);
    return determineMaxGeodes(costs, 32);
  });
  console.log(maxGeodes);
  console.log(maxGeodes.reduce((acc, val) => acc * val));
}

function determineMaxGeodes(costs: number[], minutes: number = 24): number {
  const costOreRobot = [costs[0], 0, 0, 0];
  const costClayRobot = [costs[1], 0, 0, 0];
  const costObsidianRobot = [costs[2], costs[3], 0, 0];
  const costGeodeRobot = [costs[4], 0, costs[5], 0];

  const allRobotCosts = [
    costOreRobot,
    costClayRobot,
    costObsidianRobot,
    costGeodeRobot,
  ];
  bestResults.fill(0);
  const bestResourceResult = simulate(
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    allRobotCosts,
    0,
    minutes
  );
  return bestResourceResult[3];
}

function simulate(
  robotCount: number[],
  resourceCount: number[],
  robotCosts: number[][],
  minute: number,
  maxMinutes: number
): number[] {
  if (minute >= maxMinutes) {
    return [...resourceCount];
  }
  if (bestResults[minute] > resourceCount[3] + 2) {
    return [...resourceCount];
  }
  if (bestResults[minute] < resourceCount[3]) {
    bestResults[minute] = resourceCount[3];
  }

  const differentBuilds = [];
  const maxCostsPerResource = getMaxCostPerResource(robotCosts);

  // Always build geode cracker if possible
  if (isBuildPossible(robotCosts[3], resourceCount)) {
    const newResourceCount = deductCosts(robotCosts[3], resourceCount);
    const newRobotCount = [...robotCount];
    newRobotCount[3] += 1;
    return simulate(
      newRobotCount,
      newResourceCount.map(
        (amount, resourceIndex) => amount + robotCount[resourceIndex]
      ),
      robotCosts,
      minute + 1,
      maxMinutes
    );
  }
  if (
    isBuildPossible(robotCosts[2], resourceCount) &&
    maxCostsPerResource[2] > robotCount[2] &&
      resourceCount[2] <= maxCostsPerResource[2]+1
  ) {
    const newResourceCount = deductCosts(robotCosts[2], resourceCount);
    const newRobotCount = [...robotCount];
    newRobotCount[2] += 1;
    differentBuilds.push(
      simulate(
        newRobotCount,
        newResourceCount.map(
          (amount, resourceIndex) => amount + robotCount[resourceIndex]
        ),
        robotCosts,
        minute + 1,
        maxMinutes
      )
    );
  }
  if (
    isBuildPossible(robotCosts[1], resourceCount) &&
    maxCostsPerResource[1] > robotCount[1] &&
      resourceCount[1] <= maxCostsPerResource[1]+1
  ) {
    const newResourceCount = deductCosts(robotCosts[1], resourceCount);
    const newRobotCount = [...robotCount];
    newRobotCount[1] += 1;
    differentBuilds.push(
      simulate(
        newRobotCount,
        newResourceCount.map(
          (amount, resourceIndex) => amount + robotCount[resourceIndex]
        ),
        robotCosts,
        minute + 1,
        maxMinutes
      )
    );
  }
  if (
    isBuildPossible(robotCosts[0], resourceCount) &&
    maxCostsPerResource[0] > robotCount[0] &&
      resourceCount[0] <= maxCostsPerResource[0]+1
  ) {
    const newResourceCount = deductCosts(robotCosts[0], resourceCount);
    const newRobotCount = [...robotCount];
    newRobotCount[0] += 1;
    differentBuilds.push(
      simulate(
        newRobotCount,
        newResourceCount.map(
          (amount, resourceIndex) => amount + robotCount[resourceIndex]
        ),
        robotCosts,
        minute + 1,
        maxMinutes
      )
    );
  }

  // Add possibility of doing nothing
  if (
    differentBuilds.length === 0 ||
    resourceCount[0] <= maxCostsPerResource[0] ||
    (resourceCount[1] <= maxCostsPerResource[1] && robotCount[1] >= 1) ||
    (resourceCount[2] <= maxCostsPerResource[2] && robotCount[2] >= 1)
  ) {
    differentBuilds.push(
      simulate(
        [...robotCount],
        resourceCount.map(
          (amount, resourceIndex) => amount + robotCount[resourceIndex]
        ),
        robotCosts,
        minute + 1,
        maxMinutes
      )
    );
  }

  return differentBuilds.reduce(
    (acc, val) => {
      if (val[3] > acc[3]) {
        return val;
      }
      return acc;
    },
    [0, 0, 0, 0]
  );
}

function isBuildPossible(costs: number[], resources: number[]): boolean {
  return costs.filter((cost, index) => cost > resources[index]).length === 0;
}

function deductCosts(costs: number[], resourceCount: number[]): number[] {
  return resourceCount.map(
    (amount, resourceIndex) => amount - costs[resourceIndex]
  );
}

function getMaxCostPerResource(costsPerRobot: number[][]): number[] {
  const maxCostPerResource = [];
  for (let i = 0; i <= 2; i++) {
    const specificResourceCosts = costsPerRobot.map(
      (robotType) => robotType[i]
    );
    maxCostPerResource.push(Math.max(...specificResourceCosts));
  }
  return maxCostPerResource;
}
