/**
 * {{ Entity }} domain entity
 */
export class {{ Entity }} {
  constructor(
    public readonly id: string,
    public name: string,
    public description?: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  /**
   * Update {{ entity }} data
   */
  update(data: Partial<{{ Entity }}>): void {
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.description !== undefined) {
      this.description = data.description;
    }
    this.updatedAt = new Date();
  }
}
