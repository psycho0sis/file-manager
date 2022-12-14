import { COMMANDS_WITHOUT_ARGS, ERRORS } from "../constants/index.js";
import { colorizeInRed, getCommandAndArguments } from "./index.js";

export const commandController = async (input, commands, rl) => {
  const { NO_SUCH_COMMAND_ERROR } = ERRORS;
  const [command, args] = getCommandAndArguments(input);

  if (command in commands) {
    runCommand(command, commands, args, rl);
  } else if (command) {
    printErrorAndPrompt(`${NO_SUCH_COMMAND_ERROR} ${command}`, rl);
  }
};

const runCommand = (command, commands, args = null, rl) => {
  if (!COMMANDS_WITHOUT_ARGS.includes(command) && !args) {
    printErrorAndPrompt(ERRORS.ERROR_ABOUT_REQUIRED_ARGUMENTS, rl);
  }
  commands[command](args).catch(() => {
    printErrorAndPrompt(ERRORS.DEFAULT_ERROR, rl);
  });
};

const printErrorAndPrompt = (error, rl) => {
  error && console.error(colorizeInRed(error));
  rl.prompt();
};
