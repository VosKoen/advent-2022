import events from "events";
import * as fs from "fs";
import * as readline from "readline";

export default async function (inputFilePath: string): Promise<string[]> {
  const rl = readline.createInterface({
    input: fs.createReadStream(inputFilePath),
  });

  const inputFileContents: string[] = [];
  rl.on("line", (line: string) => {
    inputFileContents.push(line);
  });

  await events.once(rl, "close");
  return inputFileContents;
}
