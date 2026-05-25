import { Relationship } from './relationship.vo';

export class LegalGuardian {
  public constructor(
    public readonly name: string,
    public readonly relationship: string,
  ) {
    this.validate();
  }

  private validate() {
    if (this.name.length <= 3) throw new Error('Nombre de tutor invalido');

    if (!this.relationship)
      throw new Error('Es necesario ingresar la relacion con el tutor');
  }
}
