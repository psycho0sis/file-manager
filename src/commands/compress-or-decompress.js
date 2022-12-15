import { resolve, parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

import { isFile, colorizeInGreen } from "../helpers/index.js";
import { checkIsFileAndThrowErrorIfNot } from "../helpers/is-file.js";
import { ERRORS } from "../constants/index.js";

export const compressOrDecompress = async (paths, flag = "compress") => {
  if (paths) {
    const [pathToFile, pathToDestination] = paths.split(" ");
    const pathToTheFile = resolve(process.cwd(), pathToFile);

    await checkIsFileAndThrowErrorIfNot(pathToFile);

    const isDirectory = await isFile(pathToTheFile);
    if (!isDirectory) throw new Error(ERRORS.NOT_A_FILE_ERROR);

    const { base } = parse(pathToTheFile);
    const fileName =
      flag === "compress" ? `${base}.br` : base.replace(".br", "");
    const pathToBrFile = resolve(pathToDestination, fileName);

    const readableStream = createReadStream(pathToTheFile, "utf-8");
    const writeableStream = createWriteStream(pathToBrFile);

    const brotliZlib =
      flag === "compress" ? createBrotliCompress() : createBrotliDecompress();

    readableStream.pipe(brotliZlib).pipe(writeableStream);

    console.log(
      colorizeInGreen(
        `File was ${flag === "compress" ? "compressed" : "decompressed"}`
      )
    );
  }
};
