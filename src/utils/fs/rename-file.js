import path from "path";
import { rename } from "fs/promises";

import { ERROR } from "../constants.js";
import { colorizeInRed } from "../colorize.js";

export const renameFile = async (currentPath, names) => {
  const [pathToFile, newName] = names.split(" ");

  const pathToTheWrongFile = path.join(currentPath, pathToFile);
  const pathToTheCorrectFile = path.join(currentPath, newName);

  try {
    await rename(pathToTheWrongFile, pathToTheCorrectFile);
    console.log("File was renamed.");
  } catch {
    console.error(colorizeInRed(ERROR));
  }
};
