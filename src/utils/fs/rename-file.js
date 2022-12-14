import { resolve } from "path";
import { rename } from "fs/promises";

import { colorizeInGreen } from "../index.js";

export const renameFile = async (fileNames) => {
  const [oldName, newName] = fileNames.split(" ");

  let pathToTheWrongFile;
  let pathToTheCorrectFile;

  if (oldName && newName) {
    pathToTheWrongFile = resolve(process.cwd(), oldName);
    pathToTheCorrectFile = resolve(process.cwd(), newName);
  }

  await rename(pathToTheWrongFile, pathToTheCorrectFile);
  console.log(colorizeInGreen("File was renamed."));
};
