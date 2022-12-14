import { readdir } from "fs/promises";

import { NAME_LIMIT } from "../constants/index.js";
import { compare, isFile } from "./index.js";

export const getFilesAndFoldersInCurrentDirectory = async () => {
  const files = await readdir(process.cwd(), { withFileTypes: true });

  const res = files
    .map((file) => ({
      Name: file.name.slice(0, NAME_LIMIT),
      Type: isFile(file),
    }))
    .sort((a, b) => compare(a.Type, b.Type));

  console.table(res);
};
