import { readdir } from "fs/promises";

import { defineCurrentDirectory } from "./define-current-directory.js";
import { colorizeInRed } from "./colorize.js";
import { compare } from "./compare.js";
import { ERROR } from "./constants.js";
import { isFile } from "./is-file.js";

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
