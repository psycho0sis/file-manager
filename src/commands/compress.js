import { resolve, parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

import { colorizeInGreen } from "../helpers/index.js";
import { checkIsFileAndThrowErrorIfNot } from "../helpers/is-file.js";

export const compress = async (paths) => {
  const [pathToFile, pathToDestination] = paths;
  const pathToTheFile = resolve(process.cwd(), pathToFile);

  await checkIsFileAndThrowErrorIfNot(pathToFile);

  const { base } = parse(pathToTheFile);
  const fileName = `${base}.br`;
  const pathToBrFile = resolve(pathToDestination, fileName);

  const readableStream = createReadStream(pathToTheFile, "utf-8");
  const writeableStream = createWriteStream(pathToBrFile);

  const brotliCompress = createBrotliCompress();

  readableStream.pipe(brotliCompress).pipe(writeableStream);

  console.log(colorizeInGreen("File was compressed"));
};
