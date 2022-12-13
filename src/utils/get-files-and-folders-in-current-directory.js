import { readdir } from "fs/promises";

import { ERROR } from "../constants/index.js";

import {
  defineCurrentDirectory,
  colorizeInRed,
  compare,
  isFile,
} from "./index.js";

export const getFilesAndFoldersInCurrentDirectory = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true });

    const res = await Promise.all(
      files
        .map((file) => ({
          Name: file.name,
          Type: isFile(file),
        }))
        .sort((a, b) => compare(a.Type, b.Type))
    );

    console.table(res);
    defineCurrentDirectory(path);
  } catch {
    console.error(colorizeInRed(ERROR));
  }
};
