import { EOL } from "os";

import { defineCurrentDirectory } from "./index.js";

export const getPrompt = (currentPath) =>
  `${defineCurrentDirectory(currentPath)}${EOL}> `;
