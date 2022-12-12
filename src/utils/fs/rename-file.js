import path from "path";
import { rename } from "fs/promises";

export const renameFile = async (currentPath, names) => {
  const [oldName, newName] = names
    .split(" ")
    .map((name) => name.replace(/["']/g, ""));

  const pathToTheWrongFile = path.join(currentPath, oldName);
  const pathToTheCorrectFile = path.join(currentPath, newName);

  try {
    await rename(pathToTheWrongFile, pathToTheCorrectFile);
    console.log("File was renamed.");
  } catch (error) {
    console.error(error);
  }
};
