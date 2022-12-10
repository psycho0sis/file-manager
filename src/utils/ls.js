import { readdir } from "fs/promises";

import { isFile } from "./is-file.js";
import { defineCurrentDirectory } from "./define-current-directory.js";

export const ls = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true });

    const res = await Promise.all(
      files.map((file) => ({
        Name: file.name,
        Type: isFile(file),
      }))
    );

    console.table(res);
    await defineCurrentDirectory(path);
  } catch (error) {
    throw new Error(error);
  }
};
