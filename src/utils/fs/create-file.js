import path from "path";
import fs from "fs/promises";

import { ERROR } from "../../constants/index.js";
import { colorizeInRed } from "../index.js";

export const createFile = async (currentPath, file) => {
  const filename = path.join(currentPath, file);
  let filehandle = null;

  try {
    filehandle = await fs.open(filename, "ax");
    console.log("File was created");
  } catch {
    console.error(colorizeInRed(ERROR));
  } finally {
    filehandle.close();
  }
};
