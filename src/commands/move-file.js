import { colorizeInGreen } from "../helpers/colorize.js";
import { copyFile, removeFile } from "./index.js";
import { checkIsFileAndThrowErrorIfNot } from "../helpers/is-file.js";

export const moveFile = async (paths) => {
  const [path] = paths;

  await checkIsFileAndThrowErrorIfNot(path);

  try {
    await copyFile(paths, false);
    await removeFile(path, false);
  } finally {
    console.log(colorizeInGreen("File was moved."));
  }
};
