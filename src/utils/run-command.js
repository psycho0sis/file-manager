import { ERROR } from "../constants/index.js";

import { colorizeInRed } from "./index.js";

export const runCommand = async (command, commands, argument, rl) => {
  console.log("command: ", command, "arg: ", argument);
  if (command in commands) {
    try {
      commands[command](argument);
    } catch (error) {
      console.error(ERROR);
      rl.prompt();
    }
  } else if (command) {
    console.error(`${colorizeInRed("Error:")}No such command -- ${command}.`);
    rl.prompt();
  } else {
    rl.prompt();
  }
};
