import { sayGoodBuyToUser } from "./say-bye-to-user.js";

export const closeReadlineProcess = async (rl) => {
  rl.question("Are you sure you want to exit? ", async (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      await sayGoodBuyToUser();
      rl.close();
    }
  });
};
