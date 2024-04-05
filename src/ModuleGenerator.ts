#! /usr/bin/env node

import { prompt } from "enquirer";
import { toCamelCase, toPascalCase } from "./utils";
import * as fs from "fs/promises";
import * as path from "path";

const PATH_TEMPLATES = `fixtures/templates/module/`;

export class ModuleGenerator {
  public async run() {
    const moduleName = await this.getModuleName();
    const modulePath = await this.getModulePath(moduleName);
    await this.ensureModuleNotExists(modulePath);
    const applicationLayer = await this.getApplicationLayer();
    const { repositoryImplementation, withRepositoryImplementation } =
      await this.getRepositoryImplementation();
    await this.generateModuleStructure(modulePath);
    await this.generateFilesWithContent(
      moduleName,
      modulePath,
      withRepositoryImplementation,
      repositoryImplementation,
      applicationLayer
    );
  }

  private async getModuleName() {
    const { moduleName } = await prompt<{
      moduleName: string;
    }>({
      type: "input",
      name: "moduleName",
      message: "What is the name of the module? (e.g. User)",
      required: true,
    });

    return moduleName;
  }

  private async getModulePath(moduleName: string) {
    const { modulePath } = await prompt<{
      modulePath: string;
    }>({
      type: "input",
      name: "modulePath",
      message: "What is the path of the module? (e.g. ./src/lib/User)",
      initial: `./src/lib/${toPascalCase(moduleName)}`,
      required: true,
    });

    return modulePath;
  }

  private async ensureModuleNotExists(modulePath: string) {
    const moduleExists = await fs
      .access(modulePath)
      .then(() => true)
      .catch(() => false);

    if (moduleExists) {
      console.error("Module already exists!");
      process.exit(1);
    }
  }

  private async getRepositoryImplementation() {
    const { withRepositoryImplementation } = await prompt<{
      withRepositoryImplementation: boolean;
    }>({
      type: "confirm",
      name: "withRepositoryImplementation",
      message: "Do you want to generate a repository implementation?",
      required: true,
    });

    const { repositoryImplementation } = await prompt<{
      repositoryImplementation: string;
    }>({
      type: "input",
      name: "repositoryImplementation",
      message:
        "What is the repository implementation? (e.g. Prisma, TypeORM, Postgres, etc.)",
      required: withRepositoryImplementation,
      skip: !withRepositoryImplementation,
    });

    return {
      withRepositoryImplementation,
      repositoryImplementation,
    };
  }

  private async generateModuleStructure(modulePath: string) {
    await fs.mkdir(modulePath, { recursive: true });
    await fs.mkdir(modulePath + "/domain", { recursive: true });
    await fs.mkdir(modulePath + "/application", { recursive: true });
    await fs.mkdir(modulePath + "/infrastructure", { recursive: true });
  }

  private async getApplicationLayer() {
    const { applicationLayer } = await prompt<{
      applicationLayer: "service" | "usecase";
    }>({
      type: "select",
      choices: [
        {
          name: "usecase",
          message: "Use case",
        },
        {
          name: "service",
          message: "Service",
        },
      ],
      message: "What is the application layer?",
      name: "applicationLayer",
      required: true,
    });

    return applicationLayer;
  }

  private async generateFilesWithContent(
    moduleName: string,
    modulePath: string,
    withRepositoryImplementation: boolean,
    repositoryImplementation: string,
    applicationLayer: "service" | "usecase"
  ) {
    const directory = path.resolve(__dirname);

    if (applicationLayer === "usecase") {
      await fs.mkdir(modulePath + "/application/Finder", { recursive: true });
    }

    const entityTemplate = await fs.readFile(
      `${directory}/${PATH_TEMPLATES}domain/Entity.md`,
      "utf-8"
    );

    const entityRepositoryTemplate = await fs.readFile(
      `${directory}/${PATH_TEMPLATES}domain/EntityRepository.md`,
      "utf-8"
    );

    let entityApplicationTemplate = "";

    if (applicationLayer === "service") {
      entityApplicationTemplate = await fs.readFile(
        `${directory}/${PATH_TEMPLATES}application/EntityService.md`,
        "utf-8"
      );
    }

    if (applicationLayer === "usecase") {
      entityApplicationTemplate = await fs.readFile(
        `${directory}/${PATH_TEMPLATES}application/UseCase/UseCase.md`,
        "utf-8"
      );
    }

    const entityRepositoryImplementationTemplate = await fs.readFile(
      `${directory}/${PATH_TEMPLATES}infrastructure/Impl/ImplEntityRepository.md`,
      "utf-8"
    );

    const entity = entityTemplate.replace(
      /{{ Entity }}/g,
      toPascalCase(moduleName)
    );

    const entityRepository = entityRepositoryTemplate.replace(
      /{{ Entity }}/g,
      toPascalCase(moduleName)
    );

    const entityApplication = entityApplicationTemplate
      .replace(/{{ Entity }}/g, toPascalCase(moduleName))
      .replace(/{{ entity }}/g, toCamelCase(moduleName))
      .replace(/{{ UseCase }}/g, "Finder");

    const entityRepositoryImplementation =
      entityRepositoryImplementationTemplate
        .replace(/{{ Entity }}/g, toPascalCase(moduleName))
        .replace(/{{ Impl }}/g, toPascalCase(repositoryImplementation));

    await fs.writeFile(
      `${modulePath}/domain/${toPascalCase(moduleName)}.ts`,
      entity
    );

    await fs.writeFile(
      `${modulePath}/domain/${toPascalCase(moduleName)}Repository.ts`,
      entityRepository
    );

    if (applicationLayer === "service") {
      await fs.writeFile(
        `${modulePath}/application/${toPascalCase(moduleName)}Service.ts`,
        entityApplication
      );
    }

    if (applicationLayer === "usecase") {
      await fs.writeFile(
        `${modulePath}/application/Finder/${toPascalCase(moduleName)}Finder.ts`,
        entityApplication
      );
    }

    if (withRepositoryImplementation) {
      await fs.mkdir(
        modulePath +
          "/infrastructure/" +
          toPascalCase(repositoryImplementation),
        { recursive: true }
      );

      await fs.writeFile(
        `${modulePath}/infrastructure/${toPascalCase(
          repositoryImplementation
        )}/${toPascalCase(repositoryImplementation)}${toPascalCase(
          moduleName
        )}Repository.ts`,
        entityRepositoryImplementation
      );
    }
  }
}
