import { colorizeInRed } from "../helpers/colorize.js";

export const username = process.argv[2].split("=")[1];

export const COMMANDS_WITHOUT_ARGS = ["ls", "up", ".exit"];

export const ERRORS = {
  DEFAULT_ERROR: `${colorizeInRed("Operation failed")}`,
  NO_SUCH_COMMAND_ERROR: `${colorizeInRed("Error:")}No such command -- `,
  ERROR_ABOUT_REQUIRED_ARGUMENTS: `${colorizeInRed(
    "Please, give required arguments"
  )}`,
};

export const NAME_LIMIT = 100;
