import { resolve, parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";

import { colorizeInGreen } from "../helpers/index.js";
import { checkIsFileAndThrowErrorIfNot } from "../helpers/is-file.js";
import { ERRORS } from "../constants/index.js";

export const decompress = async (paths) => {
  const [pathToFile, pathToDestination] = paths;
  const pathToTheFile = resolve(process.cwd(), pathToFile);

  await checkIsFileAndThrowErrorIfNot(pathToFile);

  const { base } = parse(pathToTheFile);

  if (!base.endsWith(".br")) throw new Error(ERRORS.DEFAULT_ERROR);

  const fileName = base.replace(".br", "");
  const pathToBrFile = resolve(pathToDestination, fileName);

  const readableStream = createReadStream(pathToTheFile, "utf-8");
  const writeableStream = createWriteStream(pathToBrFile);

  const brotliDecompress = createBrotliDecompress();

  readableStream.pipe(brotliDecompress).pipe(writeableStream);

  console.log(colorizeInGreen("File was decompressed"));
};
