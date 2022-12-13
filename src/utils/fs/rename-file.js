import path from "path";
import { rename } from "fs/promises";

import { ERROR } from "../../constants/index.js";
import { colorizeInRed } from "../index.js";

export const renameFile = async (currentPath, fileNames) => {
  const [oldName, newName] = fileNames.split(" ");

  let pathToTheWrongFile;
  let pathToTheCorrectFile;

  if (!!oldName && !!newName) {
    pathToTheWrongFile = path.join(currentPath, oldName);
    pathToTheCorrectFile = path.join(currentPath, newName);
  }

  try {
    await rename(pathToTheWrongFile, pathToTheCorrectFile);
    console.log("File was renamed.");
  } catch {
    console.error(colorizeInRed(ERROR));
  }
};
