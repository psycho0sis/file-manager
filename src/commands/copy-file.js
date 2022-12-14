import fs from "fs";
import { resolve, parse } from "path";

import { colorizeInGreen } from "../helpers/index.js";

export const copyFile = async (paths) => {
  if (paths) {
    const [pathToOLdFile, pathToNewDirectory] = paths.split(" ");
    const pathToTheFile = resolve(pathToOLdFile);
    const { base } = parse(pathToOLdFile);

    const pathTo = resolve(pathToNewDirectory, base);

    fs.createReadStream(pathToTheFile).pipe(fs.createWriteStream(pathTo));

    console.log(colorizeInGreen("File was copied."));
  }
};
