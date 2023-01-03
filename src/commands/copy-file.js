import fs from "fs";
import { resolve, parse } from "path";

import { colorizeInGreen } from "../helpers/index.js";
import { checkIsFileAndThrowErrorIfNot } from "../helpers/is-file.js";

//флаг нужен только из-за того, что функция используется в move-file.js и там мне не нужно выводить в консоль промежуточный этап
export const copyFile = async (paths, flag = true) => {
  const [pathToOLdFile, pathToNewDirectory] = paths;

  await checkIsFileAndThrowErrorIfNot(pathToOLdFile);
  const pathToTheFile = resolve(pathToOLdFile);
  const { base } = parse(pathToOLdFile);

  const pathTo = resolve(pathToNewDirectory, base);

  fs.createReadStream(pathToTheFile).pipe(fs.createWriteStream(pathTo));

  flag && console.log(colorizeInGreen("File was copied."));
};
