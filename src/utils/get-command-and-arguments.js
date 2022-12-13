export const getCommandAndArguments = (input) => {
  const firstSpace = input.match(/\s/);
  let argument = undefined;
  let command = input;

  if (firstSpace) {
    command = input.slice(0, firstSpace.index).trim();
  }

  if (firstSpace) {
    argument = input
      .slice(firstSpace.index + 1, input.length)
      .replace(/["']/g, "");
  }

  return [command, argument];
};
