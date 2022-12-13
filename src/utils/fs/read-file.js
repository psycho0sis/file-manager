import path from "path";
import { createReadStream } from "fs";
import { access, constants } from "fs/promises";

import { ERROR } from "../../constants/index.js";
import { colorizeInRed } from "../index.js";

export const readFile = async (currentPath, pathToTheFile) => {
  try {
    await access(
      path.join(currentPath, pathToFolder),
      constants.R_OK | constants.W_OK
    );

    const path1 = path.join(currentPath, pathToTheFile);
    const stream = createReadStream(path1, "utf8");

    stream.pipe(process.stdout);
  } catch (error) {
    console.error(colorizeInRed(ERROR));
  }
};
