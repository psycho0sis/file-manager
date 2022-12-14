import { readdir } from "fs/promises";

import { compare, isFile } from "./index.js";

export const getFilesAndFoldersInCurrentDirectory = async (path) => {
  const files = await readdir(path, { withFileTypes: true });

  const res = files
    .map((file) => ({
      Name: file.name,
      Type: isFile(file),
    }))
    .sort((a, b) => compare(a.Type, b.Type));

  console.table(res);
};
