import { EOL } from "os";

import { defineCurrentDirectory } from "./define-current-directory.js";

export const getPrompt = (currentPath) =>
  `${defineCurrentDirectory(currentPath)}${EOL}> `;
