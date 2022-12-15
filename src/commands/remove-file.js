import { resolve } from "path";
import { unlink } from "fs/promises";

import { checkIsFileAndThrowErrorIfNot } from "../helpers/is-file.js";
import { colorizeInGreen } from "../helpers/index.js";

//флаг нужен только из-за того, что функция используется в move-file.js и там мне не нужно выводить в консоль промежуточный этап
export const removeFile = async (fileName, flag = true) => {
  await checkIsFileAndThrowErrorIfNot(fileName);
  const pathToTheFile = resolve(process.cwd(), fileName);

  await unlink(pathToTheFile);

  flag && console.log(colorizeInGreen("File was deleted."));
};
