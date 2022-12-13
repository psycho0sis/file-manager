import path from "path";
import { unlink } from "fs/promises";

import { ERROR } from "../constants.js";
import { colorizeInRed } from "../colorize.js";

export const removeFile = async (currentPath, fileName) => {
  const pathToTheFile = path.join(currentPath, fileName);

  try {
    await unlink(pathToTheFile);
    console.log("File was deleted.");
  } catch {
    console.error(colorizeInRed(ERROR));
  }
};
