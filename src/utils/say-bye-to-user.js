import { EOL } from "os";
import process from "process";

import { colorizeInCyan } from "./colorize.js";
import { username } from "../constants/index.js";

export const sayGoodBuyToUser = async () => {
  process.stdout.write(
    colorizeInCyan(
      `${EOL}Thank you for using File Manager, ${username}, goodbye!`
    )
  );
};
