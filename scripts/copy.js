const fs = require("fs-extra");

const sourceDir = "src/fixtures";
const distDir = "dist/fixtures";

function copyFiles() {
  fs.copySync(sourceDir, distDir, { overwrite: true });
}

copyFiles();
