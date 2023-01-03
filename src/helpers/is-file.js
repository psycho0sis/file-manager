import fs from "fs/promises";

import { ERRORS } from "../constants/index.js";

export const isFile = async (file) => {
  const stats = await fs.stat(file);

  return stats.isFile();
};

export const checkIsFileAndThrowErrorIfNot = async (fileName) => {
  const condition = await isFile(fileName);

  if (!condition) throw new Error(ERRORS.NOT_A_FILE_ERROR);
};
