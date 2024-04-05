import { {{ Entity }} } from "./{{ Entity }}";

export interface {{ Entity }}Repository {
  searchById(id: string): Promise<{{ Entity }} | null>;
}
