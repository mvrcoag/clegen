#! /usr/bin/env node

import { ModularGenerator } from "./ModularGenerator";
import { ParsedCliConfig } from "../core/types/CliOptions";

/**
 * Generator selector
 * Entry point for the CLI tool with CLI args support
 */
export class GeneratorSelector {
  constructor(private cliConfig?: ParsedCliConfig) {}

  async run(): Promise<void> {
    await new ModularGenerator(this.cliConfig).run();
  }
}
