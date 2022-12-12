import fs from "fs/promises";
import path from "path";

export const createFile = async (currentPath, file) => {
  const filename = path.join(currentPath, file);
  let filehandle = null;

  try {
    filehandle = await fs.open(filename, "ax");
    filehandle.close();
  } catch (e) {
    console.log("Error", e);
  }
};
