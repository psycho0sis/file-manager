export const colorizeInYellow = (string) => {
  return `\x1b[33m${string} \x1b[0m`;
};

export const colorizeInRed = (string) => {
  return `\x1b[91m${string} \x1b[0m`;
};

export const colorizeInCyan = (string) => {
  return `\x1b[36m${string} \x1b[0m`;
};
