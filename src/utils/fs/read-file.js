import { resolve } from "path";
import { createReadStream } from "fs";
import { access, constants } from "fs/promises";

export const readFile = async (pathToFile) => {
  await access(
    resolve(process.cwd(), pathToFile),
    constants.R_OK | constants.W_OK
  );

  const path1 = path.join(currentPath, pathToFile);
  const stream = createReadStream(path1, "utf8");

  stream.pipe(process.stdout);
};
