#! /usr/bin/env node

import { prompt } from "enquirer";
import { toCamelCase, toPascalCase } from "./utils";
import * as fs from "fs/promises";
import * as path from "path";

async function main() {
  console.log("agmod - Agnostic Module Generator");
  console.log("By @mvrcoag\n");
  console.log("This tool will help you generate a module in your project.\n");

  const { moduleName } = await prompt<{
    moduleName: string;
  }>({
    type: "input",
    name: "moduleName",
    message: "What is the name of the module? (e.g. User)",
    required: true,
  });

  const { modulePath } = await prompt<{
    modulePath: string;
  }>({
    type: "input",
    name: "modulePath",
    message: "What is the path of the module? (e.g. ./src/lib/User)",
    initial: `./src/lib/${toPascalCase(moduleName)}`,
    required: true,
  });

  const moduleExists = await fs
    .access(modulePath)
    .then(() => true)
    .catch(() => false);

  if (moduleExists) {
    console.error("Module already exists!");
    return;
  }

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

  await fs.mkdir(modulePath, { recursive: true });
  await fs.mkdir(modulePath + "/domain", { recursive: true });
  await fs.mkdir(modulePath + "/application", { recursive: true });
  await fs.mkdir(modulePath + "/infrastructure", { recursive: true });

  const directory = path.resolve(__dirname);

  const entityTemplate = await fs.readFile(
    `${directory}/templates/domain/Entity.md`,
    "utf-8"
  );
  const entityRepositoryTemplate = await fs.readFile(
    `${directory}/templates/domain/EntityRepository.md`,
    "utf-8"
  );
  const entityServiceTemplate = await fs.readFile(
    `${directory}/templates/application/EntityService.md`,
    "utf-8"
  );
  const entityRepositoryImplementationTemplate = await fs.readFile(
    `${directory}/templates/infrastructure/Impl/ImplEntityRepository.md`,
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

  const entityService = entityServiceTemplate
    .replace(/{{ Entity }}/g, toPascalCase(moduleName))
    .replace(/{{ entity }}/g, toCamelCase(moduleName));

  const entityRepositoryImplementation = entityRepositoryImplementationTemplate
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

  await fs.writeFile(
    `${modulePath}/application/${toPascalCase(moduleName)}Service.ts`,
    entityService
  );

  if (withRepositoryImplementation) {
    await fs.mkdir(
      modulePath + "/infrastructure/" + toPascalCase(repositoryImplementation),
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

  console.log("\n");
  console.log("Module generated successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
