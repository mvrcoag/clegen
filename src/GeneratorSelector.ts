#! /usr/bin/env node

import { prompt } from "enquirer";
import { ModuleGenerator } from "./ModuleGenerator";
import { UseCaseGenerator } from "./UseCaseGenerator";
import { ReactSectionGenerator } from "./ReactSectionGenerator";

const BACKEND_ORIENTED_CHAR = "🧩";
const FRONTEND_ORIENTED_CHAR = "⚡";

export class GeneratorSelector {
  async run() {
    console.log(`${BACKEND_ORIENTED_CHAR} stands for "backend oriented"`);
    console.log(`${FRONTEND_ORIENTED_CHAR} stands for "frontend oriented"\n`);

    const { generator } = await prompt<{
      generator: "module" | "usecase" | "reactsection";
    }>({
      type: "select",
      choices: [
        {
          name: "reactsection",
          message: `Generate a react section ${FRONTEND_ORIENTED_CHAR}`,
        },
        {
          name: "module",
          message: `Generate a full module ${BACKEND_ORIENTED_CHAR}`,
        },
        {
          name: "usecase",
          message: `Generate a usecase ${BACKEND_ORIENTED_CHAR}`,
        },
      ],
      message: "What do you want to generate?",
      name: "generator",
      required: true,
    });

    if (generator === "module") {
      await new ModuleGenerator().run();
    }

    if (generator === "usecase") {
      await new UseCaseGenerator().run();
    }

    if (generator === "reactsection") {
      await new ReactSectionGenerator().run();
    }
  }
}
