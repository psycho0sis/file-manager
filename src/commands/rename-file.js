import { resolve } from "path";
import { rename } from "fs/promises";

import { colorizeInGreen } from "../helpers/index.js";
import { checkIsFileAndThrowErrorIfNot } from "../helpers/is-file.js";

export const renameFile = async (fileNames) => {
  const [oldName, newName] = fileNames;

  await checkIsFileAndThrowErrorIfNot(oldName);

  let pathToTheWrongFile;
  let pathToTheCorrectFile;

  if (oldName && newName) {
    pathToTheWrongFile = resolve(process.cwd(), oldName);
    pathToTheCorrectFile = resolve(process.cwd(), newName);
  }

  await rename(pathToTheWrongFile, pathToTheCorrectFile);
  console.log(colorizeInGreen("File was renamed."));
};
