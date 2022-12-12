import path from "path";
import { unlink } from "fs/promises";

export const removeFile = async (currentPath, fileName) => {
  const pathToTheFile = path.join(currentPath, fileName);

  try {
    await unlink(pathToTheFile);
    console.log("File was deleted.");
  } catch (error) {
    console.error(error);
  }
};
