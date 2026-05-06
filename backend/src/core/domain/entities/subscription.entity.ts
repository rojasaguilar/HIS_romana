import { MonthlyVisits } from '../types/monthly-visits.type';
import { SubscriptionStatus } from '../types/subscription-status.type';
import { VisitUsage } from '../types/visit-usage';

export class SubscriptionEntity {
  constructor(
    private readonly _patientId: string,
    private readonly _planId: string,
    private _durationInMonths: number,
    private _price: number,
    private _startDate: Date,
    private _endDate: Date,
    private _monthlyVisitsIncluded: MonthlyVisits[],
    private _visitsUsed: VisitUsage[],
    private _status: SubscriptionStatus = 'active',
    public readonly id?: string,
  ) {
    this.validate();
  }

  private validate() {
    if (!this._patientId) throw new Error('patientId requerido');
    if (!this._planId) throw new Error('planId requerido');

    if (this._durationInMonths <= 0) {
      throw new Error('durationInMonths inválido');
    }

    if (this._price < 0) {
      throw new Error('price inválido');
    }

    if (this._endDate <= this._startDate) {
      throw new Error('endDate debe ser mayor que startDate');
    }

    if (!this._monthlyVisitsIncluded.length) {
      throw new Error('Debe incluir al menos un servicio');
    }

    for (const item of this._monthlyVisitsIncluded) {
      if (!item.serviceId) throw new Error('serviceId requerido');
      if (item.visits <= 0) throw new Error('Visits inválido');
    }
  }

  // getters
  get patientId() {
    return this._patientId;
  }

  get planId() {
    return this._planId;
  }

  get durationInMonths() {
    return this._durationInMonths;
  }

  get price() {
    return this._price;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get monthlyVisitsIncluded() {
    return [...this._monthlyVisitsIncluded];
  }

  get visitsUsed() {
    return [...this._visitsUsed];
  }

  get status() {
    return this._status;
  }

  // 🔥 ahora usa serviceId + valida estado
  canUseVisit(serviceId: string, date: Date): boolean {
    if (!this.isActive()) return false;

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const used = this._visitsUsed.find(
      (v) => v.serviceId === serviceId && v.month === month && v.year === year,
    );

    const allowed =
      this._monthlyVisitsIncluded.find((s) => s.serviceId === serviceId)
        ?.visits || 0;

    return (used?.used || 0) < allowed;
  }

  useVisit(serviceId: string, date: Date) {
    if (!this.isActive()) {
      throw new Error('La suscripción no está activa');
    }

    if (!this.canUseVisit(serviceId, date)) {
      throw new Error('No tiene visitas disponibles para este servicio');
    }

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const existing = this._visitsUsed.find(
      (v) => v.serviceId === serviceId && v.month === month && v.year === year,
    );

    if (existing) {
      existing.used += 1;
    } else {
      this._visitsUsed.push({
        serviceId,
        used: 1,
        month,
        year,
      });
    }
  }

  expire() {
    this._status = 'expired';
  }

  cancel() {
    this._status = 'cancelled';
  }

  isActive(): boolean {
    return this._status === 'active' && new Date() <= this._endDate;
  }
}
