import path from "path";
import { createHash } from "crypto";
import { readFile } from "fs/promises";

import { ERROR } from "../constants/index.js";
import { colorizeInRed } from "./index.js";

export const calculateHash = async (currentPath, pathToFile) => {
  const pathToTheFile = path.join(currentPath, pathToFile);

  try {
    const data = await readFile(pathToTheFile, { encoding: "utf-8" });
    const hex = createHash("sha256").update(data).digest("hex");

    console.log(`Hash was created: ${hex}`);
  } catch {
    console.error(colorizeInRed(ERROR));
  }
};
