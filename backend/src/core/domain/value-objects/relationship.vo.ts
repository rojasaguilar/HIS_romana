export class Relationship {
  private validRelations = ['padre', 'madre', 'abuela', 'abuelo', 'hermano'];

  private constructor(private value: string) {
    if (!this.validRelations.includes(value)) {
      throw new Error(`Invalid relationship`);
    }
  }

  public static create(value: string) {
    return new Relationship(value);
  }

  getValue(): string {
    return this.value;
  }
}
