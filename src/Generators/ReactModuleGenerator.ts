#! /usr/bin/env node

import * as fs from "fs/promises";
import { FileFromContent, Generator } from "./Generator";

export class ReactModuleGenerator {
  public async run() {
    const moduleName = await Generator.getModuleName();
    const modulePath = await Generator.getModulePath(
      moduleName,
      "./src/sections"
    );
    await Generator.ensureModuleNotExists(modulePath);

    await this.generateSectionStructure(modulePath);

    const files: FileFromContent[] = [
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `fixtures/templates/hexarc/domain/Entity.md`,
        destinePath: `${modulePath}/domain/${moduleName}.ts`,
      },
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `fixtures/templates/react/View.md`,
        destinePath: `${modulePath}/components/${moduleName}View.tsx`,
      },
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `fixtures/templates/react/useView.md`,
        destinePath: `${modulePath}/hooks/use${moduleName}View.tsx`,
      },
    ];

    for (const file of files) {
      await Generator.generateFileFromContent(file);
    }
  }

  private async generateSectionStructure(modulePath: string) {
    await fs.mkdir(modulePath, { recursive: true });
    await fs.mkdir(modulePath + "/components", { recursive: true });
    await fs.mkdir(modulePath + "/hooks", { recursive: true });
    await fs.mkdir(modulePath + "/domain", { recursive: true });
    await fs.mkdir(modulePath + `/services`, {
      recursive: true,
    });
  }
}
