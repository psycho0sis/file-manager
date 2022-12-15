import { readdir } from "fs/promises";

import { NAME_LIMIT } from "../constants/index.js";
import { compare, isFile } from "../helpers/index.js";

export const getFilesAndFoldersInCurrentDirectory = async () => {
  const files = await readdir(process.cwd(), { withFileTypes: true });

  const result = await Promise.all(
    files.map(async (file) => {
      const type = (await isFile(file.name)) ? "file" : "directory";

      return {
        Name: file.name.slice(0, NAME_LIMIT),
        Type: type,
      };
    })
  );

  const sortedResult = result.sort((a, b) => compare(a.Type, b.Type));

  console.table(sortedResult);
};
