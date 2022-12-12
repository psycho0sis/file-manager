import path, { sep } from "path";
import os, { EOL } from "os";
import readline from "readline";
import { fileURLToPath } from "url";
import process from "process";

import { ls } from "./utils/ls.js";
import { sayHelloToUser } from "./utils/say-hello-to-user.js";
import { defineCurrentDirectory } from "./utils/define-current-directory.js";
import { printOSInformation } from "./utils/os/index.js";
import { closeReadlineProcess } from "./utils/close-readline-proccess.js";
import { read } from "./utils/fs/read-file.js";
import { createFile } from "./utils/fs/create-file.js";
import { renameFile } from "./utils/fs/rename-file.js";
import { removeFile } from "./utils/fs/remove-file.js";

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
  add: async function (filename) {
    try {
      await createFile(currentPath, filename);
      rl.prompt();
    } catch (error) {
      console.log(error);
    }
  },

  cat: async function (pathToTheFile) {
    try {
      await read(currentPath, pathToTheFile);
      rl.prompt();
    } catch (error) {
      console.log(error);
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

  rn: async function (names) {
    try {
      await renameFile(currentPath, names);
      rl._prompt = conf.getPrompt();
      rl.prompt();
    } catch (error) {
      console.error(error);
    }
  },

  rm: async function (fileName) {
    try {
      await removeFile(currentPath, fileName);
    } catch (error) {
      console.error(error);
    }
  },

  up: async function () {
    try {
      if (currentPath !== os.homedir()) {
        currentPath = path.join(currentPath, sep, "..");
      }
      defineCurrentDirectory(currentPath);
    } catch (error) {
      console.error(error);
    }
  },

  help: function () {
    try {
      console.log(Object.keys(commands));
      rl._prompt = conf.getPrompt();
      rl.prompt();
    } catch (error) {
      console.error(error);
    }
  },

  [".exit"]: async function () {
    try {
      await closeReadlineProcess(rl);
    } catch (error) {
      console.error(error);
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

rl.on("SIGINT", async () => {
  await closeReadlineProcess(rl);
});
