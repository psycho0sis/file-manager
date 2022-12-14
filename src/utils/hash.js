import { resolve } from "path";
import { createHash } from "crypto";
import { readFile } from "fs/promises";

import { colorizeInGreen } from "./index.js";

export const calculateHash = async (pathToFile) => {
  const pathToTheFile = resolve(process.cwd(), pathToFile);

  const data = await readFile(pathToTheFile, { encoding: "utf-8" });
  const hex = createHash("sha256").update(data).digest("hex");

  console.log(colorizeInGreen(`Hash was created: ${hex}`));
};
