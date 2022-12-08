"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDay7b = exports.runDay7a = void 0;
const parseInput_1 = __importDefault(require("../common/parseInput"));
function runDay7a() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-7");
        const fileSystem = {};
        let location = "/"; //Start at root
        inputArray.forEach((line) => {
            location = processLine(line, location, fileSystem);
        });
        console.log(getSizeFoldersMax(fileSystem, 100000));
    });
}
exports.runDay7a = runDay7a;
function runDay7b() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputArray = yield (0, parseInput_1.default)(__dirname + "/input-7");
        const fileSystem = {};
        let location = "/"; //Start at root
        inputArray.forEach((line) => {
            location = processLine(line, location, fileSystem);
        });
        const allDirectories = mapAllDirectorySizes(fileSystem, "/");
        const sumRoot = allDirectories.reduce((acc, val) => ["sumRoot", val[1]]);
        const targetReduction = sumRoot[1] - 70000000 + 30000000;
        console.log(allDirectories.reduce((acc, val) => {
            if (val[1] <= acc[1] && val[1] >= targetReduction) {
                return val;
            }
            return acc;
        }, sumRoot));
    });
}
exports.runDay7b = runDay7b;
function processLine(line, location, fileSystem) {
    if (line.substring(0, 4) === "$ cd") {
        // Navigate
        return changeLocation(line.substring(5), location);
    }
    if (line.substring(0, 1) !== "$") {
        // Read output, build file system if not known yet
        if (location === "/") {
            addInfoToSystem(fileSystem, line);
        }
        else {
            const openedFolder = openFolder(fileSystem, location.split("/").filter((element) => element !== ""));
            addInfoToSystem(openedFolder, line);
        }
    }
    return location;
}
function openFolder(fileSystem, subFolders) {
    if (subFolders.length === 0) {
        return fileSystem;
    }
    const folderNameToOpen = subFolders[0];
    subFolders.shift();
    return openFolder(fileSystem[`${folderNameToOpen}`], subFolders);
}
function addInfoToSystem(fileSystem, info) {
    if (info.substring(0, 3) === "dir") {
        const newDir = info.substring(4);
        if (fileSystem[newDir] === undefined) {
            fileSystem[newDir] = {};
        }
    }
    else {
        const fileInfo = info.split(" ");
        if (fileSystem[fileInfo[1]] === undefined) {
            fileSystem[fileInfo[1]] = parseInt(fileInfo[0], 10);
        }
    }
}
function changeLocation(commandedLocation, location) {
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
function getSizeFoldersMax(fileSystem, maxValue, isRoot = true, accumulator = 0) {
    const fileSystemArray = Object.entries(fileSystem);
    const size = fileSystemArray
        .map((fileSystemEntry) => {
        if (typeof fileSystemEntry[1] === "number") {
            return fileSystemEntry[1];
        }
        const result = getSizeFoldersMax(fileSystemEntry[1], maxValue, false, accumulator);
        accumulator = result[1];
        return result[0];
    })
        .reduce((acc, val) => acc + val);
    if (size <= maxValue && !isRoot) {
        accumulator = accumulator + size;
    }
    return [size, accumulator];
}
function mapAllDirectorySizes(fileSystem, currentDir, dirSizes = []) {
    const fileSystemArray = Object.entries(fileSystem);
    const size = fileSystemArray
        .map((fileSystemEntry) => {
        if (typeof fileSystemEntry[1] === "number") {
            return fileSystemEntry[1];
        }
        const result = mapAllDirectorySizes(fileSystemEntry[1], fileSystemEntry[0], dirSizes);
        return result[result.length - 1][1];
    })
        .reduce((acc, val) => acc + val);
    dirSizes.push([currentDir, size]);
    return dirSizes;
}
