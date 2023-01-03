import { resolve } from "path";
import { createReadStream } from "fs";
import { access, constants } from "fs/promises";
import { checkIsFileAndThrowErrorIfNot } from "../helpers/is-file.js";

export const readFile = async (fileName) => {
  await checkIsFileAndThrowErrorIfNot(fileName);

  await access(
    resolve(process.cwd(), fileName),
    constants.R_OK | constants.W_OK
  );

  const pathToFile = resolve(process.cwd(), fileName);
  const stream = createReadStream(pathToFile, "utf8");

  stream.pipe(process.stdout);
};
