import process from "process";
import readline from "readline";
import path, { sep } from "path";
import os, { EOL } from "os";
import { fileURLToPath } from "url";
import { access, constants } from "fs/promises";

import { getFilesAndFoldersInCurrentDirectory } from "./utils/get-files-and-folders-in-current-directory.js";
import { getCommandAndArguments } from "./utils/get-command-and-arguments.js";
import { defineCurrentDirectory } from "./utils/define-current-directory.js";
import { closeReadlineProcess } from "./utils/close-readline-proccess.js";
import { sayHelloToUser } from "./utils/say-hello-to-user.js";
import { printOSInformation } from "./utils/os/index.js";
import { createFile } from "./utils/fs/create-file.js";
import { renameFile } from "./utils/fs/rename-file.js";
import { removeFile } from "./utils/fs/remove-file.js";
import { readFile } from "./utils/fs/read-file.js";
import { calculateHash } from "./utils/hash.js";
import { ERROR } from "./utils/constants.js";

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
  add: async (filename) => {
    await createFile(currentPath, filename);

    rl.prompt();
  },

  cat: async (pathToTheFile) => {
    await readFile(currentPath, pathToTheFile, rl);

    rl.prompt();
  },

  cd: async (pathToFolder) => {
    await access(
      path.join(currentPath, pathToFolder),
      constants.R_OK | constants.W_OK
    );
    currentPath = path.join(currentPath, pathToFolder);

    rl._prompt = conf.getPrompt();
    rl.prompt();
  },

  // cd: async function () {
  //   try {
  //   } catch (error) {}
  // },

  hash: async (pathToFile) => {
    await calculateHash(currentPath, pathToFile);

    rl.prompt();
  },

  ls: async () => {
    await getFilesAndFoldersInCurrentDirectory(currentPath);

    rl.prompt();
  },

  os: async (input) => {
    const argv = input && input.split("--")[1];

    await printOSInformation(argv);

    rl.prompt();
  },

  rn: async (names) => {
    await renameFile(currentPath, names);

    rl.prompt();
  },

  rm: async (fileName) => {
    await removeFile(currentPath, fileName);

    rl.prompt();
  },

  up: async () => {
    if (currentPath !== os.homedir()) {
      currentPath = path.join(currentPath, sep, "..");
    }

    rl._prompt = conf.getPrompt();
    rl.prompt();
  },

  [".exit"]: async () => {
    await closeReadlineProcess(rl);
  },
};

rl.on("line", (input) => {
  const [command, argument] = getCommandAndArguments(input);

  if (command in commands) {
    try {
      commands[command](argument);
    } catch (error) {
      console.error(ERROR);
    }
  }
});

rl.on("SIGINT", async () => {
  await closeReadlineProcess(rl);
});
