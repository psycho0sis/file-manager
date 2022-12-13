import { EOL } from "os";
import process from "process";

import { colorizeInCyan } from "./colorize.js";

export const defineCurrentDirectory = (dirname) => {
  process.stdout.write(
    `${EOL}You are currently in ${colorizeInCyan(dirname)}${EOL}`
  );
  return "";
};
