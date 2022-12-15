import os from "os";
import process from "process";
import readline from "readline";

import {
  sayHelloToUser,
  commandController,
  getPrompt,
} from "./helpers/index.js";

import {
  getFilesAndFoldersInCurrentDirectory,
  closeReadlineProcess,
  printOSInformation,
  calculateHash,
  compressOrDecompress,
  createFile,
  copyFile,
  moveFile,
  renameFile,
  removeFile,
  readFile,
} from "./commands/index.js";

process.chdir(os.homedir());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.prompt();

rl.write(await sayHelloToUser());
rl.setPrompt(getPrompt());
rl.prompt();

const commands = {
  add: async (fileName) => await createFile(fileName),

  cat: async (pathToTheFile) => await readFile(pathToTheFile),

  cd: async (pathToFolder) => {
    process.chdir(`${pathToFolder}`);
  },

  compress: async (paths) => await compressOrDecompress(paths),

  decompress: async (paths, command) => {
    command === "decompress"
      ? await compressOrDecompress(paths, "decompress")
      : await compressOrDecompress(paths);
  },

  cp: async (paths) => await copyFile(paths),

  hash: async (pathToFile) => await calculateHash(pathToFile),

  ls: async () => await getFilesAndFoldersInCurrentDirectory(),

  mv: async (paths) => await moveFile(paths),

  os: async (flag) => {
    const argv = flag && flag.split("--")[1];

    await printOSInformation(argv);
  },

  rn: async (fileNames) => await renameFile(fileNames),

  rm: async (fileName) => await removeFile(fileName),

  up: async () => process.chdir(".."),

  [".exit"]: async () => await closeReadlineProcess(rl),
};

rl.on("line", async (input) => {
  if (!input) {
    rl.prompt();
  } else {
    //commandController() - что-то вроде контроллера, запускает функции, передает нужные аргументы, отлавливает ошибки
    await commandController(input.trim(), commands, rl);
  }
});

rl.on("SIGINT", async () => {
  await closeReadlineProcess(rl);
});

// process.on("uncaughtException", () => prompt());
