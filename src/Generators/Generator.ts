import { prompt } from "enquirer";
import * as fs from "fs/promises";
import * as path from "path";

export type FileFromContent = {
  contentPath: string;
  contentMap: Record<string, string>;
  destinePath: string;
};

export class Generator {
  static async getModuleName() {
    const { moduleName } = await prompt<{
      moduleName: string;
    }>({
      type: "input",
      name: "moduleName",
      message: "What is the name of the module? (e.g. User)",
      required: true,
    });

    return moduleName.replace(/\s/g, "");
  }

  static async getModulePath(moduleName: string, defaultPath: string) {
    const { modulePath } = await prompt<{
      modulePath: string;
    }>({
      type: "input",
      name: "modulePath",
      message: `What is the path of the module? (e.g. ${defaultPath}/User)`,
      initial: `${defaultPath}/${moduleName}`,
      required: true,
    });

    return modulePath.replace(/\s/g, "");
  }

  static async ensureModuleNotExists(modulePath: string) {
    const moduleExists = await fs
      .access(modulePath)
      .then(() => true)
      .catch(() => false);

    if (moduleExists) {
      console.error("Module already exists!");
      process.exit(1);
    }
  }

  static async getRepositoryImplementation(examples: string) {
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
      message: `What is the repository implementation? (e.g. ${examples})`,
      required: withRepositoryImplementation,
      skip: !withRepositoryImplementation,
    });

    return {
      withRepositoryImplementation,
      repositoryImplementation: repositoryImplementation.replace(/\s/g, ""),
    };
  }

  static async generateFileFromContent({
    contentPath,
    contentMap,
    destinePath,
  }: FileFromContent) {
    const directory = path.resolve(__dirname + "/..");

    const content = await fs.readFile(`${directory}/${contentPath}`, "utf-8");

    let fileContent = content;

    Object.entries(contentMap).forEach(([key, value]) => {
      fileContent = fileContent.replace(new RegExp(key, "g"), value);
    });

    await fs.writeFile(destinePath, fileContent);
  }

  static async generateModuleStructure(modulePath: string) {
    await fs.mkdir(modulePath, { recursive: true });
    await fs.mkdir(modulePath + "/domain", { recursive: true });
    await fs.mkdir(modulePath + "/application", { recursive: true });
    await fs.mkdir(modulePath + "/infrastructure", { recursive: true });
  }
}
