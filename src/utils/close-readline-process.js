import { sayGoodBuyToUser } from "./say-bye-to-user.js";
import { colorizeInRed } from "./colorize.js";

export const closeReadlineProcess = async (rl) => {
  rl.question(
    colorizeInRed("Are you sure you want to exit? (y/n) "),
    async (answer) => {
      if (answer.match(/^y(es)?$/i)) {
        await sayGoodBuyToUser();
        rl.close();
      } else {
        rl.prompt();
      }
    }
  );
};
