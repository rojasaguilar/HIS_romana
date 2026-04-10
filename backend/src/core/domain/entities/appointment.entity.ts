import { AppointmentCanNotBeCancelled } from '../errors/appointment.error';
import { Status } from '../types/appointment-status.type';
import { Billing } from '../types/billing.type';
import { Cancellation } from '../value-objects/cancellation.vo';

export class AppointmentEntity {
  private constructor(
    public startTime: Date,
    public endTime: Date,
    public patientId: string,
    public medicId: string,
    public serviceId: string,
    public status: Status,
    public type: 'IN_PERSON' | 'ONLINE',
    public patientCharge: number,
    public medicEarning: number,
    public billing: Billing,
    public cancellation?: Cancellation,
    public preNotes?: string,
    public postNotes?: string,
    public readonly id?: string,
  ) {}

  static create() {}

  public cancel() {
    if (!this.canBeCancelled)
      throw new AppointmentCanNotBeCancelled(
        `Appointmet with status: ${this.status} can not be cancelled`,
      );
  }

  public complete() {}

  public markNoShow() {}

  public reSchedule() {}

  private canBeCancelled(): Boolean {
    return this.status === 'PROGRAMADA';
  }
  private canBeReschedule(): Boolean {
    return this.status === 'PROGRAMADA';
  }
  private canBeCompleted(): Boolean {
    return this.status === 'PROGRAMADA';
  }

  public getSummary() {}

  public updateNotes() {}
}
