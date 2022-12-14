export const getCommandAndArguments = (input) => {
  const firstSpace = input.match(/\s/);
  let args = undefined;
  let command = input;

  if (firstSpace) {
    command = input.slice(0, firstSpace.index).trim();
  }

  if (firstSpace) {
    args = input.slice(firstSpace.index + 1, input.length).replace(/["']/g, "");
  }

  return [command, args];
};
