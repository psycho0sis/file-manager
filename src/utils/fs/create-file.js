import path from "path";
import fs from "fs/promises";

import { ERROR } from "../constants.js";
import { colorizeInRed } from "../colorize.js";

export const createFile = async (currentPath, file) => {
  const filename = path.join(currentPath, file);
  let filehandle = null;

  try {
    filehandle = await fs.open(filename, "ax");
    filehandle.close();
    console.log("File was created");
  } catch {
    console.error(colorizeInRed(ERROR));
  }
};
