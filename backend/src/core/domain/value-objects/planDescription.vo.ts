export class PlanDescription {
  constructor(
    private readonly _durationInMonths: number,
    private readonly _price: number,
    private readonly _monthlyVisitsIncluded: {
      service: string;
      visits: number;
    }[],
  ) {
    this.validate();
  }

  private validate() {
    if (this._durationInMonths <= 0) {
      throw new Error('durationInMonths debe ser mayor a 0');
    }

    if (this._price <= 0) {
      throw new Error('price debe ser mayor a 0');
    }

    if (!this._monthlyVisitsIncluded.length) {
      throw new Error('Debe incluir al menos un servicio');
    }

    for (const item of this._monthlyVisitsIncluded) {
      if (!item.service) {
        throw new Error('Service es requerido');
      }

      if (item.visits <= 0) {
        throw new Error('Visits debe ser mayor a 0');
      }
    }
  }

  get durationInMonths() {
    return this._durationInMonths;
  }

  get price() {
    return this._price;
  }

  get monthlyVisitsIncluded() {
    return this._monthlyVisitsIncluded;
  }
}
