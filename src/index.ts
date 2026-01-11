#! /usr/bin/env node

import { GeneratorSelector } from "./Generators/GeneratorSelector";
import { CliParser } from "./core/base/CliParser";

async function main() {
  // Parse CLI arguments
  const parser = new CliParser();
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.includes("--help") || args.includes("-h")) {
    parser.showHelp();
    process.exit(0);
  }

  const cliConfig = parser.parse(args);

  // Cool ASCII banner
  console.log("\n");
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║                                                        ║");
  console.log("║   ██████╗██╗     ███████╗ ██████╗ ███████╗███╗   ██╗   ║");
  console.log("║  ██╔════╝██║     ██╔════╝██╔════╝ ██╔════╝████╗  ██║   ║");
  console.log("║  ██║     ██║     █████╗  ██║  ███╗█████╗  ██╔██╗ ██║   ║");
  console.log("║  ██║     ██║     ██╔══╝  ██║   ██║██╔══╝  ██║╚██╗██║   ║");
  console.log("║  ╚██████╗███████╗███████╗╚██████╔╝███████╗██║ ╚████║   ║");
  console.log("║   ╚═════╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ║");
  console.log("║                                                        ║");
  console.log("║           Clean Architecture Module Generator          ║");
  console.log("║                     v6.1.1                             ║");
  console.log("║                                                        ║");
  console.log("║                   By @mvrcoag                          ║");
  console.log("║                                                        ║");
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log("\n");

  await new GeneratorSelector(cliConfig).run();

  console.log("\n");
  console.log("╔═══════════════════════════════════════════════════════════╗");
  console.log("║                                                           ║");
  console.log("║                    ✨ Success! 🎉                        ║");
  console.log("║          Your module has been generated!                 ║");
  console.log("║                                                           ║");
  console.log("╚═══════════════════════════════════════════════════════════╝");
  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
