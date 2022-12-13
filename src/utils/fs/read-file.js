import path from "path";
import { createReadStream } from "fs";

import { ERROR } from "../constants.js";
import { colorizeInRed } from "../colorize.js";

export const readFile = async (currentPath, pathToTheFile) => {
  const path1 = path.join(currentPath, pathToTheFile);
  const stream = createReadStream(path1, "utf8");

  stream.pipe(process.stdout);

  stream.on("error", () => console.error(colorizeInRed(ERROR)));
};
