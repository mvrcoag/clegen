import { {{ Entity }}Repository } from "../domain/{{ Entity }}Repository";
import { {{ Entity }} } from "../domain/{{ Entity }}";

export class {{ Entity }}Service {
  constructor(private readonly repository: {{ Entity }}Repository) {}

  async findById(id: string): Promise<{{ Entity }}> {
    const {{ entity }} = await this.repository.searchById(id);

    if (!{{ entity }}) {
      throw new Error("{{ Entity }} not found");
    }

    return {{ entity }};
  }
}
