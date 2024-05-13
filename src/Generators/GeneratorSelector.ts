#! /usr/bin/env node

import { prompt } from "enquirer";
import { HexagonalArchitectureModuleGenerator } from "./HexagonalArchitectureModuleGenerator";
import { ReactModuleGenerator } from "./ReactModuleGenerator";

export class GeneratorSelector {
  async run() {
    const { generator } = await prompt<{
      generator: "hexarc" | "react";
    }>({
      type: "select",
      choices: [
        {
          name: "hexarc",
          message: `Hexagonal architecture backend module`,
        },
        {
          name: "react",
          message: `React module`,
        },
      ],
      message: "What do you want to generate?",
      name: "generator",
      required: true,
    });

    if (generator === "hexarc") {
      await new HexagonalArchitectureModuleGenerator().run();
    }

    if (generator === "react") {
      await new ReactModuleGenerator().run();
    }
  }
}
