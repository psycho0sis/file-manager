import { EOL } from "os";

import { colorizeInYellow } from "../utils/colorize.js";
import { username } from "../constants/index.js";

export const sayHelloToUser = async () => {
  process.stdout.write(
    colorizeInYellow(`Welcome to the File Manager, ${username}!${EOL}`)
  );
  return "";
};
