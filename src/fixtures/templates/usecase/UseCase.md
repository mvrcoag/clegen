import { {{ Entity }}Repository } from "../../domain/{{ Entity }}Repository";

export class {{ Entity }}{{ UseCase }} {
  constructor(private readonly repository: {{ Entity }}Repository) {}

  async run(): Promise<void> {}
}
