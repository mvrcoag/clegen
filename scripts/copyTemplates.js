const fs = require("fs-extra");
const path = require("path");

const sourceDir = "src/templates";
const distDir = "dist/templates";

function copyFiles() {
  fs.copySync(sourceDir, distDir, { overwrite: true });
}

copyFiles();
