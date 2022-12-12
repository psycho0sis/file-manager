import path from "path";
import { createReadStream } from "fs";

export const read = async (currentPath, pathToTheFile) => {
  const path1 = path.join(currentPath, pathToTheFile);
  const stream = createReadStream(path1, "utf8");

  stream.pipe(process.stdout);
};
