import { PlanDescription } from '../value-objects/planDescription.vo';

export class PlanEntity {
  constructor(
    private _name: string,
    private _variants: PlanDescription[],
    private _description: string,
    private _isActive: boolean,
    public readonly id?: string,
  ) {
    this.validate();
  }

  private validate() {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('El nombre es requerido');
    }

    if (!this._variants || this._variants.length === 0) {
      throw new Error('Debe existir al menos una variante');
    }

    this.validateUniqueDurations();
  }

  private validateUniqueDurations() {
    const durations = new Set<number>();

    for (const variant of this._variants) {
      const duration = variant.durationInMonths;

      if (durations.has(duration)) {
        throw new Error('No puede haber duraciones duplicadas');
      }

      durations.add(duration);
    }
  }

  // getters
  get name(): string {
    return this._name;
  }

  get variants(): PlanDescription[] {
    return [...this._variants];
  }

  get description(): string {
    return this._description;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  // comportamiento
  addVariant(variant: PlanDescription) {
    if (
      this._variants.some(
        (v) => v.durationInMonths === variant.durationInMonths,
      )
    ) {
      throw new Error('Duración duplicada');
    }

    this._variants.push(variant);
  }

  updateName(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error('Nombre inválido');
    }

    this._name = name;
  }

  updateDescription(description: string) {
    this._description = description;
  }

  activate() {
    this._isActive = true;
  }

  deactivate() {
    this._isActive = false;
  }

  getVariantByDuration(months: number): PlanDescription | undefined {
    return this._variants.find((v) => v.durationInMonths === months);
  }
}
