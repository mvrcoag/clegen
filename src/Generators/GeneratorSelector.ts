#! /usr/bin/env node

import { prompt } from "enquirer";
import { ModuleGenerator } from "./ModuleGenerator";
import { SectionGenerator } from "./SectionGenerator";

export class GeneratorSelector {
  async run() {
    const { generator } = await prompt<{
      generator: "module" | "section";
    }>({
      type: "select",
      choices: [
        {
          name: "module",
          message: `Backend module`,
        },
        {
          name: "section",
          message: `Frontend section`,
        },
      ],
      message: "What do you want to generate?",
      name: "generator",
      required: true,
    });

    if (generator === "module") {
      await new ModuleGenerator().run();
    }

    if (generator === "section") {
      await new SectionGenerator().run();
    }
  }
}
