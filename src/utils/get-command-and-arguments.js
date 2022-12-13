export const getCommandAndArguments = (input) => {
  const firstSpace = input.match(/\s/);
  let argument = "";
  let command = input;

  if (firstSpace) {
    command = input.slice(0, firstSpace.index);
  }

  if (firstSpace) {
    argument = input
      .slice(firstSpace.index + 1, input.length)
      .replace(/["']/g, "");
  }

  return [command, argument];
};
