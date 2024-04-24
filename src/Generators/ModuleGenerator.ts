#! /usr/bin/env node

import { FileFromContent, Generator } from "./Generator";

const PATH_TEMPLATES = `fixtures/templates/module`;

export class ModuleGenerator {
  public async run() {
    const moduleName = await Generator.getModuleName();
    const modulePath = await Generator.getModulePath(moduleName, "./src/lib");
    await Generator.ensureModuleNotExists(modulePath);
    const { repositoryImplementation, withRepositoryImplementation } =
      await Generator.getRepositoryImplementation(
        "Prisma, TypeORM, PostgreSQL, etc."
      );
    await Generator.generateModuleStructure(modulePath);

    const files: FileFromContent[] = [
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `${PATH_TEMPLATES}/domain/Entity.md`,
        destinePath: `${modulePath}/domain/${moduleName}.ts`,
      },
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `${PATH_TEMPLATES}/domain/EntityRepository.md`,
        destinePath: `${modulePath}/domain/${moduleName}Repository.ts`,
      },
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `${PATH_TEMPLATES}/application/EntityService.md`,
        destinePath: `${modulePath}/application/${moduleName}Service.ts`,
      },
    ];

    if (withRepositoryImplementation) {
      files.push({
        contentMap: {
          "{{ Entity }}": moduleName,
          "{{ Impl }}": repositoryImplementation,
        },
        contentPath: `${PATH_TEMPLATES}/infrastructure/ImplEntityRepository.md`,
        destinePath: `${modulePath}/infrastructure/${repositoryImplementation}${moduleName}Repository.ts`,
      });
    }

    for (const file of files) {
      await Generator.generateFileFromContent(file);
    }
  }
}
