import parseInput from "../common/parseInput";

interface FileStructure {
  [x: string]: FileStructure | number;
}

export async function runDay7a() {
  const inputArray = await parseInput(__dirname + "/input-7");
  const fileSystem: FileStructure = {};
  let location = "/"; //Start at root
  inputArray.forEach((line) => {
    location = processLine(line, location, fileSystem);
  });

  console.log(getSizeFoldersMax(fileSystem, 100000));
}

export async function runDay7b() {
  const inputArray = await parseInput(__dirname + "/input-7");
  const fileSystem: FileStructure = {};
  let location = "/"; //Start at root
  inputArray.forEach((line) => {
    location = processLine(line, location, fileSystem);
  });
  const allDirectories = mapAllDirectorySizes(fileSystem, "/");
  const sumRoot = allDirectories.reduce((acc, val) => ["sumRoot", val[1]]);
  const targetReduction = sumRoot[1] - 70000000 + 30000000;
  console.log(
    allDirectories.reduce((acc, val) => {
      if (val[1] <= acc[1] && val[1] >= targetReduction) {
        return val;
      }
      return acc;
    }, sumRoot)
  );
}

function processLine(
  line: string,
  location: string,
  fileSystem: FileStructure
): string {
  if (line.substring(0, 4) === "$ cd") {
    // Navigate
    return changeLocation(line.substring(5), location);
  }
  if (line.substring(0, 1) !== "$") {
    // Read output, build file system if not known yet
    if (location === "/") {
      addInfoToSystem(fileSystem, line);
    } else {
      const openedFolder = openFolder(
        fileSystem,
        location.split("/").filter((element) => element !== "")
      );
      addInfoToSystem(openedFolder, line);
    }
  }
  return location;
}

function openFolder(
  fileSystem: FileStructure,
  subFolders: string[]
): FileStructure {
  if (subFolders.length === 0) {
    return fileSystem;
  }
  const folderNameToOpen = subFolders[0];
  subFolders.shift();
  return openFolder(
    fileSystem[`${folderNameToOpen}`] as FileStructure,
    subFolders
  );
}

function addInfoToSystem(fileSystem: FileStructure, info: string): void {
  if (info.substring(0, 3) === "dir") {
    const newDir = info.substring(4);
    if (fileSystem[newDir] === undefined) {
      fileSystem[newDir] = {};
    }
  } else {
    const fileInfo = info.split(" ");
    if (fileSystem[fileInfo[1]] === undefined) {
      fileSystem[fileInfo[1]] = parseInt(fileInfo[0], 10);
    }
  }
}

function changeLocation(commandedLocation: string, location: string): string {
  if (commandedLocation === "/") {
    return "/";
  }
  if (commandedLocation === "..") {
    const locationArray = location.split("/");
    locationArray.pop();
    return `/${locationArray.join("/")}`;
  }
  return `${location}${location === "/" ? "" : "/"}${commandedLocation}`;
}

function getSizeFoldersMax(
  fileSystem: FileStructure,
  maxValue: number,
  isRoot: boolean = true,
  accumulator: number = 0
): number[] {
  const fileSystemArray = Object.entries(fileSystem);
  const size = fileSystemArray
    .map((fileSystemEntry) => {
      if (typeof fileSystemEntry[1] === "number") {
        return fileSystemEntry[1];
      }
      const result = getSizeFoldersMax(
        fileSystemEntry[1],
        maxValue,
        false,
        accumulator
      );
      accumulator = result[1];
      return result[0];
    })
    .reduce((acc, val) => acc + val);
  if (size <= maxValue && !isRoot) {
    accumulator = accumulator + size;
  }
  return [size, accumulator];
}

function mapAllDirectorySizes(
  fileSystem: FileStructure,
  currentDir: string,
  dirSizes: [string, number][] = []
): [string, number][] {
  const fileSystemArray = Object.entries(fileSystem);
  const size = fileSystemArray
    .map((fileSystemEntry) => {
      if (typeof fileSystemEntry[1] === "number") {
        return fileSystemEntry[1];
      }
      const result = mapAllDirectorySizes(
        fileSystemEntry[1],
        fileSystemEntry[0],
        dirSizes
      );
      return result[result.length - 1][1];
    })
    .reduce((acc, val) => acc + val);

  dirSizes.push([currentDir, size]);
  return dirSizes;
}
