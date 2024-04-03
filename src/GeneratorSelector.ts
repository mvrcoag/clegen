#! /usr/bin/env node

import { prompt } from "enquirer";
import { ModuleGenerator } from "./ModuleGenerator";
import { UseCaseGenerator } from "./UseCaseGenerator";

export class GeneratorSelector {
  async run() {
    const { generator } = await prompt<{
      generator: "module" | "usecase";
    }>({
      type: "select",
      choices: [
        {
          name: "module",
          message: "Generate a full module",
        },
        {
          name: "usecase",
          message: "Generate a usecase",
        },
      ],
      message: "What do you want to generate?",
      name: "generator",
      required: true,
    });

    if (generator === "module") {
      await new ModuleGenerator().run();
    } else {
      await new UseCaseGenerator().run();
    }
  }
}
