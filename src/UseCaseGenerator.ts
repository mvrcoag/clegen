#! /usr/bin/env node

import { prompt } from "enquirer";
import { normalizeInputToPascalCase } from "./utils";
import * as fs from "fs/promises";
import * as path from "path";

const PATH_TEMPLATES = `fixtures/templates/usecase/`;

export class UseCaseGenerator {
  public async run() {
    const moduleName = await this.getModuleName();
    const useCaseName = await this.getUseCaseName();
    const useCasePath = await this.getUseCasePath(moduleName, useCaseName);
    await this.ensureUseCaseNotExists(useCasePath);
    await this.generateUseCaseStructure(useCasePath);
    await this.generateFilesWithContent(moduleName, useCaseName, useCasePath);
  }

  private async getModuleName() {
    const { moduleName } = await prompt<{
      moduleName: string;
    }>({
      type: "input",
      name: "moduleName",
      message:
        "What is the name of the module? (e.g. User, Reset Password, etc.)",
      required: true,
    });

    return moduleName;
  }

  private async getUseCaseName() {
    const { useCaseName } = await prompt<{
      useCaseName: string;
    }>({
      type: "input",
      name: "useCaseName",
      message: "What is the name of the use case? (e.g. Creator)",
      required: true,
    });

    return useCaseName;
  }

  private async getUseCasePath(moduleName: string, useCaseName: string) {
    const { useCasePath } = await prompt<{
      useCasePath: string;
    }>({
      type: "input",
      name: "useCasePath",
      message:
        "What is the path of the use case? (e.g. ./src/lib/User/application/UserCreator)",
      initial: `./src/lib/${normalizeInputToPascalCase(
        moduleName
      )}/application/${normalizeInputToPascalCase(useCaseName)}`,
      required: true,
    });

    return useCasePath;
  }

  private async ensureUseCaseNotExists(useCasePath: string) {
    const useCaseExists = await fs
      .access(useCasePath)
      .then(() => true)
      .catch(() => false);

    if (useCaseExists) {
      console.error("Use case already exists!");
      process.exit(1);
    }
  }

  private async generateUseCaseStructure(useCasePath: string) {
    await fs.mkdir(useCasePath, { recursive: true });
  }

  private async generateFilesWithContent(
    moduleName: string,
    useCaseName: string,
    useCasePath: string
  ) {
    const directory = path.resolve(__dirname);

    const useCaseTemplate = await fs.readFile(
      `${directory}/${PATH_TEMPLATES}/UseCase.md`,
      "utf-8"
    );

    const useCase = useCaseTemplate
      .replace(/{{ Entity }}/g, normalizeInputToPascalCase(moduleName))
      .replace(/{{ UseCase }}/g, normalizeInputToPascalCase(useCaseName));

    await fs.writeFile(
      `${useCasePath}/${normalizeInputToPascalCase(
        moduleName
      )}${normalizeInputToPascalCase(useCaseName)}.ts`,
      useCase
    );
  }
}
