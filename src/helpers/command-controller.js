import { commandsHashMap, ERRORS } from "../constants/index.js";
import { colorizeInRed, getPrompt } from "./index.js";

export const commandController = async (input, commands, rl) => {
  const { NO_SUCH_COMMAND_ERROR } = ERRORS;
  const [command, ...args] = input.split(" ");

  if (command in commands) {
    runCommand(command, commands, args, rl);
  } else if (command) {
    printErrorAndPrompt(`${NO_SUCH_COMMAND_ERROR} ${command}`, rl);
  }
};

const runCommand = async (command, commands, args = null, rl) => {
  const {
    COMMANDS_WITHOUT_ARGS,
    COMMANDS_WITH_ONE_ARG,
    COMMANDS_WITH_TWO_ARG,
  } = commandsHashMap;

  try {
    if (/"|'/g.test(args)) {
      args = args
        .join(" ")
        .split(/["'] | ["']/)
        .map((arg) => arg.replace(/"|'/g, ""));
    }

    const argsLength = args && args.length;

    if (!COMMANDS_WITHOUT_ARGS.includes(command) && !args) {
      printErrorAndPrompt(ERRORS.ERROR_ABOUT_REQUIRED_ARGUMENTS, rl);
    } else if (COMMANDS_WITH_ONE_ARG.includes(command) && argsLength === 1) {
      console.log(args);
      await commands[command](args[0], command).catch(() => {
        printErrorAndPrompt(ERRORS.DEFAULT_ERROR, rl);
      });
    } else if (COMMANDS_WITH_TWO_ARG.includes(command) && argsLength === 2) {
      await commands[command](args, command).catch(() => {
        printErrorAndPrompt(ERRORS.DEFAULT_ERROR, rl);
      });
    } else {
      await commands[command]().catch(() => {
        printErrorAndPrompt(ERRORS.DEFAULT_ERROR, rl);
      });
    }

    if (command !== ".exit") {
      rl._prompt = getPrompt();
      rl.prompt();
    }
  } catch (error) {
    printErrorAndPrompt(ERRORS.DEFAULT_ERROR, rl);
  }
};

const printErrorAndPrompt = (error, rl) => {
  error && console.error(colorizeInRed(error));
  rl.prompt();
};
