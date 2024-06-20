import * as fs from "fs/promises";
import { FileFromContent, Generator } from "./Generator";

export class ServiceArchitectureModuleGenerator {
  async run() {
    const moduleName = await Generator.getModuleName();
    const modulePath = await Generator.getModulePath(moduleName, "./src/lib");
    await Generator.ensureModuleNotExists(modulePath);
    await this.generateSectionStructure(modulePath);

    const files: FileFromContent[] = [
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `fixtures/templates/services/Types.md`,
        destinePath: `${modulePath}/${moduleName}Types.ts`,
      },
      {
        contentMap: {
          "{{ Entity }}": moduleName,
        },
        contentPath: `fixtures/templates/services/Service.md`,
        destinePath: `${modulePath}/${moduleName}Service.ts`,
      },
    ];

    for (const file of files) {
      await Generator.generateFileFromContent(file);
    }
  }

  private async generateSectionStructure(modulePath: string) {
    await fs.mkdir(modulePath, { recursive: true });
  }
}
