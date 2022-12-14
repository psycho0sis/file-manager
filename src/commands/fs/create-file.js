import { resolve } from "path";
import fs from "fs/promises";

import { colorizeInGreen } from "../../helpers/index.js";

export const createFile = async (file) => {
  const filename = resolve(process.cwd(), file);
  let filehandle = null;

  filehandle = await fs.open(filename, "ax");
  console.log(colorizeInGreen("File was created"));
  filehandle?.close();
};
