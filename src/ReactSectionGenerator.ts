#! /usr/bin/env node

import { prompt } from "enquirer";
import { toPascalCase } from "./utils";
import * as fs from "fs/promises";
import * as path from "path";

const PATH_TEMPLATES = `fixtures/templates/reactsection`;

export class ReactSectionGenerator {
  public async run() {
    const sectionName = await this.getSectionName();
    const sectionPath = await this.getSectionPath(sectionName);
    await this.ensureSectionNotExists(sectionPath);
    await this.generateSectionStructure(sectionPath);
    await this.generateFilesWithContent(sectionName, sectionPath);
  }

  private async getSectionName() {
    const { sectionName } = await prompt<{
      sectionName: string;
    }>({
      type: "input",
      name: "sectionName",
      message: "What is the name of the section? (e.g. User)",
      required: true,
    });

    return sectionName;
  }

  private async getSectionPath(sectionName: string) {
    const { sectionPath } = await prompt<{
      sectionPath: string;
    }>({
      type: "input",
      name: "sectionPath",
      message: "What is the path of the section? (e.g. ./src/sections/User)",
      initial: `./src/sections/${toPascalCase(sectionName)}`,
      required: true,
    });

    return sectionPath;
  }

  private async ensureSectionNotExists(sectionPath: string) {
    const sectionExists = await fs
      .access(sectionPath)
      .then(() => true)
      .catch(() => false);

    if (sectionExists) {
      console.error("Section already exists!");
      process.exit(1);
    }
  }

  private async generateSectionStructure(sectionPath: string) {
    await fs.mkdir(sectionPath, { recursive: true });
    await fs.mkdir(`${sectionPath}/components`, { recursive: true });
    await fs.writeFile(`${sectionPath}/utils.ts`, "");
  }

  private async generateFilesWithContent(
    sectionName: string,
    sectionPath: string
  ) {
    const directory = path.resolve(__dirname);

    const viewTemplate = await fs.readFile(
      `${directory}/${PATH_TEMPLATES}/View.md`,
      "utf-8"
    );

    const useViewTemplate = await fs.readFile(
      `${directory}/${PATH_TEMPLATES}/useView.md`,
      "utf-8"
    );

    const formTemplate = await fs.readFile(
      `${directory}/${PATH_TEMPLATES}/Form.md`,
      "utf-8"
    );

    const useFormTemplate = await fs.readFile(
      `${directory}/${PATH_TEMPLATES}/useForm.md`,
      "utf-8"
    );

    const view = viewTemplate.replace(
      /{{ Section }}/g,
      toPascalCase(sectionName)
    );

    const useView = useViewTemplate.replace(
      /{{ Section }}/g,
      toPascalCase(sectionName)
    );

    const form = formTemplate.replace(
      /{{ Section }}/g,
      toPascalCase(sectionName)
    );

    const useForm = useFormTemplate.replace(
      /{{ Section }}/g,
      toPascalCase(sectionName)
    );

    await fs.writeFile(
      `${sectionPath}/${toPascalCase(sectionName)}View.ts`,
      view
    );

    await fs.writeFile(
      `${sectionPath}/use${toPascalCase(sectionName)}View.ts`,
      useView
    );

    await fs.writeFile(
      `${sectionPath}/${toPascalCase(sectionName)}Form.ts`,
      form
    );

    await fs.writeFile(
      `${sectionPath}/use${toPascalCase(sectionName)}Form.ts`,
      useForm
    );
  }
}
