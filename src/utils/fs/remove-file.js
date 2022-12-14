import { resolve } from "path";
import { unlink } from "fs/promises";

import { colorizeInGreen } from "../index.js";

export const removeFile = async (fileName) => {
  const pathToTheFile = resolve(process.cwd(), fileName);

  await unlink(pathToTheFile);
  console.log(colorizeInGreen("File was deleted."));
};
