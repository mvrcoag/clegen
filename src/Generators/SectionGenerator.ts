#! /usr/bin/env node

import { FileFromContent, Generator } from "./Generator";

export class SectionGenerator {
  public async run() {
    const moduleName = await Generator.getModuleName();
    const modulePath = await Generator.getModulePath(
      moduleName,
      "./src/sections"
    );
    await Generator.ensureModuleNotExists(modulePath);
    const { repositoryImplementation, withRepositoryImplementation } =
      await Generator.getRepositoryImplementation(
        "Axios, Fetch, LocalStorage, etc."
      );
    await Generator.generateModuleStructure(moduleName, modulePath);

    const files: FileFromContent[] = [
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `fixtures/templates/module/domain/Entity.md`,
        destinePath: `${modulePath}/domain/${moduleName}.ts`,
      },
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `fixtures/templates/module/domain/EntityRepository.md`,
        destinePath: `${modulePath}/domain/${moduleName}Repository.ts`,
      },
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `fixtures/templates/module/application/EntityGetAll/EntityGetAll.md`,
        destinePath: `${modulePath}/application/${moduleName}GetAll/${moduleName}GetAll.ts`,
      },
    ];

    if (withRepositoryImplementation) {
      files.push({
        contentMap: {
          "{{ Entity }}": moduleName,
          "{{ Impl }}": repositoryImplementation,
        },
        contentPath: `fixtures/templates/module/infrastructure/ImplEntityRepository.md`,
        destinePath: `${modulePath}/infrastructure/${repositoryImplementation}${moduleName}Repository.ts`,
      });
    }

    for (const file of files) {
      await Generator.generateFileFromContent(file);
    }

    console.log("\nRemember:");
    console.log(
      `- The framework files (e.g. React, Angular, Vue) belong to the infrastructure layer.`
    );
  }
}
