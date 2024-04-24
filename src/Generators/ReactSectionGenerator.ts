#! /usr/bin/env node

import { FileFromContent, Generator } from "./Generator";
import * as fs from "fs/promises";

export class ReactSectionGenerator {
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
    await Generator.generateModuleStructure(modulePath);

    await fs.mkdir(`${modulePath}/application/components`, { recursive: true });
    await fs.mkdir(`${modulePath}/application/hooks`, { recursive: true });

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
        contentPath: `fixtures/templates/module/application/EntityService.md`,
        destinePath: `${modulePath}/application/${moduleName}Service.ts`,
      },
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `fixtures/templates/reactsection/EntityView.md`,
        destinePath: `${modulePath}/application/components/${moduleName}View.tsx`,
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
  }
}
