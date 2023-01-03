import { EOL } from "os";
import process from "process";

import { colorizeInCyan } from "./index.js";

export const defineCurrentDirectory = () => {
  process.stdout.write(
    `${EOL}You are currently in ${colorizeInCyan(process.cwd())}${EOL}`
  );
  return "";
};
