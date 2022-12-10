import path, { sep } from "path";
import { EOL } from "os";
import readline from "readline";
import { fileURLToPath } from "url";
import process from "process";

import { ls } from "./utils/ls.js";
import { sayHelloToUser } from "./utils/say-hello-to-user.js";
import { sayGoodBuyToUser } from "./utils/say-bye-to-user.js";
import { defineCurrentDirectory } from "./utils/define-current-directory.js";
import { printOSInformation } from "./utils/os/index.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

let currentPath = __dirname;

let conf = {
  getPrompt: function () {
    return `${defineCurrentDirectory(currentPath)}${EOL}> `;
  },
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.prompt();

rl.write(await sayHelloToUser());
rl.setPrompt(conf.getPrompt());
rl.prompt();

const commands = {
  pwd: function () {
    try {
      console.log(process.cwd());
      rl._prompt = conf.getPrompt();
      rl.prompt();
    } catch (error) {
      throw new Error(error);
    }
  },

  close: function () {
    rl.close();
  },

  ls: function () {
    try {
      ls(currentPath);
      rl._prompt = conf.getPrompt();
      rl.prompt();
    } catch (error) {
      throw new Error(error);
    }
  },

  os: async function (input) {
    const argv = input && input.split("--")[1];
    try {
      await printOSInformation(argv);
      rl._prompt = conf.getPrompt();
      rl.prompt();
    } catch (error) {
      throw new Error(error);
    }
  },

  up: async function () {
    try {
      currentPath = path.join(currentPath, sep, "..");
      defineCurrentDirectory(currentPath);
      rl._prompt = conf.getPrompt();
      rl.prompt();
    } catch (error) {
      throw new Error(error);
    }
  },

  help: function () {
    try {
      console.log(Object.keys(commands));
      rl._prompt = conf.getPrompt();
      rl.prompt();
    } catch (error) {
      throw new Error(error);
    }
  },

  [". exit"]: function (input) {
    //TODO потом переработать на команду .exit
    if (input === "SIGINT") {
      rl.question("Are you sure you want to exit? ", async (answer) => {
        if (answer.match(/^y(es)?$/i)) {
          await sayGoodBuyToUser();
          rl.close();
        }
      });
    }
  },
};

rl.on("line", (input) => {
  let firstSpace = input.match(/\s/);

  let com = input;
  if (firstSpace) {
    com = input.slice(0, firstSpace.index);
  }

  let argument = "";
  if (firstSpace) {
    argument = input.slice(firstSpace.index + 1, input.length);
  }

  if (com in commands) {
    commands[com](argument);
  }
});

rl.on("SIGINT", () => {
  rl.question("Are you sure you want to exit? ", async (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      await sayGoodBuyToUser();
      rl.close();
    }
  });
});
