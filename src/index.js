import os from "os";
import process from "process";
import readline from "readline";

import {
  getFilesAndFoldersInCurrentDirectory,
  closeReadlineProcess,
  sayHelloToUser,
  printOSInformation,
  commandController,
  calculateHash,
  getPrompt,
} from "./utils/index.js";

import {
  createFile,
  renameFile,
  removeFile,
  readFile,
} from "./utils/fs/index.js";

process.chdir(os.homedir());

const prompt = async () => {
  rl._prompt = getPrompt();
  rl.prompt();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.prompt();

rl.write(await sayHelloToUser());
rl.setPrompt(getPrompt());
rl.prompt();

const commands = {
  add: async (fileName) => {
    await createFile(fileName);
    prompt();
  },

  cat: async (pathToTheFile) => {
    await readFile(pathToTheFile);
    prompt();
  },

  cd: async (pathToFolder) => {
    process.chdir(pathToFolder);
    prompt();
  },

  // cp: async function () {
  //   try {
  //   } catch (error) {}
  // },

  hash: async (pathToFile) => {
    await calculateHash(pathToFile);
    prompt();
  },

  ls: async () => {
    await getFilesAndFoldersInCurrentDirectory();
    prompt();
  },

  os: async (flag) => {
    const argv = flag && flag.split("--")[1];

    await printOSInformation(argv);
    prompt();
  },

  rn: async (fileNames) => {
    await renameFile(fileNames);
    prompt();
  },

  rm: async (fileName) => {
    await removeFile(fileName);
    prompt();
  },

  up: async () => {
    process.chdir("..");
    prompt();
  },

  [".exit"]: async () => {
    await closeReadlineProcess(rl);
  },
};

rl.on("line", async (input) => {
  if (!input) {
    rl.prompt();
  } else {
    //commandController() - что-то вроде контроллера, запускает функции, передает нужные аргументы, отлавливает ошибки
    await commandController(input, commands, rl);
  }
});

rl.on("SIGINT", async () => {
  await closeReadlineProcess(rl);
});
