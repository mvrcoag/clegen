import { {{ Entity }}Repository } from "../../domain/{{ Entity }}Repository";
import { {{ Entity }} } from "../../domain/{{ Entity }}";

export class {{ Impl }}{{ Entity }}Repository implements {{ Entity }}Repository {
  constructor() {}

  public async searchById(id: string): Promise<{{ Entity }} | null> {
    return null;
  }
}
