#! /usr/bin/env node

import { GeneratorSelector } from "./Generators/GeneratorSelector";

async function main() {
  console.log("Clegen - Clean Generator v2.0.0");
  console.log("By @mvrcoag\n");

  await new GeneratorSelector().run();

  console.log("\n");
  console.log("Success! 🎉");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
