import process from "process";
import readline from "readline";
import path, { sep } from "path";
import os, { EOL } from "os";
import { fileURLToPath } from "url";
import { access, constants } from "fs/promises";

import { ERROR } from "./constants/index.js";

import {
  getFilesAndFoldersInCurrentDirectory,
  getCommandAndArguments,
  defineCurrentDirectory,
  closeReadlineProcess,
  sayHelloToUser,
  printOSInformation,
  runCommand,
  calculateHash,
} from "./utils/index.js";

import {
  createFile,
  renameFile,
  removeFile,
  readFile,
} from "./utils/fs/index.js";

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

    // rl._prompt = conf.getPrompt();
    // rl.prompt();
  },

  cat: async (pathToTheFile) => {
    await readFile(currentPath, pathToTheFile);

    rl._prompt = conf.getPrompt();
    rl.prompt();
  },

  cd: async (pathToFolder) => {
    try {
      await access(
        path.join(currentPath, pathToFolder),
        constants.R_OK | constants.W_OK
      );
      currentPath = path.join(currentPath, pathToFolder);
    } catch {
      console.log(ERROR);
    } finally {
      rl._prompt = conf.getPrompt();
      rl.prompt();
    }
  },

  // cp: async function () {
  //   try {
  //   } catch (error) {}
  // },

  hash: async (pathToFile) => {
    await calculateHash(currentPath, pathToFile);

    rl._prompt = conf.getPrompt();
    rl.prompt();
  },

  ls: async () => {
    await getFilesAndFoldersInCurrentDirectory(currentPath);

    // rl._prompt = conf.getPrompt();
    // rl.prompt();
  },

  os: async (input) => {
    const argv = input && input.split("--")[1];

    await printOSInformation(argv);
  },

  rn: async (fileNames) => {
    await renameFile(currentPath, fileNames);

    rl._prompt = conf.getPrompt();
    rl.prompt();
  },

  rm: async (fileName) => {
    await removeFile(currentPath, fileName);

    rl._prompt = conf.getPrompt();
    rl.prompt();
  },

  up: async () => {
    if (currentPath !== os.homedir()) {
      currentPath = path.join(currentPath, sep, "..");
    }
  },

  [".exit"]: async () => {
    await closeReadlineProcess(rl);
  },
};

rl.on("line", async (input) => {
  const [command, argument] = getCommandAndArguments(input);

  await runCommand(command, commands, argument, rl);
});

rl.on("SIGINT", async () => {
  await closeReadlineProcess(rl);
});
