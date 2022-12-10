import os, { EOL } from "os";

export const printOSInformation = async (argv) => {
  switch (argv) {
    case "architecture": {
      console.log(`CPU architecture:  ${os.arch()}`);
      break;
    }

    case "EOL": {
      console.log(EOL);
      break;
    }
    case "cpus":
      console.log(`Overall amount of CPUS ${os.cpus().length}`);
      os.cpus().forEach((cpu) => {
        console.log(cpu.model, cpu.speed);
      });
      break;

    case "homedir":
      console.log(`Home directory: ${os.homedir()}`);
      break;

    case "username":
      console.log(`Username:  ${os.userInfo().username}`);
      break;

    default:
      break;
  }
};
