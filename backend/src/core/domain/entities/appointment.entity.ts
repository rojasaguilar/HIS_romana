import {
  AppointmentCanNotBeCancelled,
  AppointmentCanNotBeCompleted,
  AppointmentCanNotBeReschedule,
  AppointmentDateError,
  AppointmentInconsistentStateError,
} from '../errors/appointment.error';
import { Status } from '../types/appointment-status.type';
import { BillingVO } from '../value-objects/billing.vo';
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
    public billing: BillingVO,
    public cancellation?: Cancellation,
    public preNotes?: string,
    public postNotes?: string,
    public completedAt?: Date,
    public readonly id?: string,
  ) {}

  static create(
    startTime: Date,
    endTime: Date,
    patientId: string,
    medicId: string,
    serviceId: string,
    status: Status,
    type: 'IN_PERSON' | 'ONLINE',
    patientCharge: number,
    medicEarning: number,
    billing: BillingVO,
    cancellation?: Cancellation,
    preNotes?: string,
    postNotes?: string,
    completedAt?: Date,
    id?: string,
  ) {
    this.validateEndDateLessThanStartDate(startTime, endTime);

    if (status === 'COMPLETADA' && !completedAt) {
      throw new AppointmentInconsistentStateError(
        `A completed appointment must have a conclussion date`,
      );
    }

    if (status === 'COMPLETADA' && patientCharge === undefined) {
      throw new AppointmentInconsistentStateError(
        `A completed appointment must have a patient charge`,
      );
    }

    if (status === 'COMPLETADA' && medicEarning === undefined) {
      throw new AppointmentInconsistentStateError(
        `A completed appointment must have registered medic earning`,
      );
    }

    if (status === 'PROGRAMADA' && completedAt)
      throw new AppointmentInconsistentStateError(
        `An scheduled appointment can not have a completed date`,
      );

    if (status === 'PROGRAMADA' && cancellation)
      throw new AppointmentInconsistentStateError(
        `An scheduled appointment can not have cancellation info`,
      );

    if (status === 'CANCELADA' && !cancellation) {
      throw new AppointmentInconsistentStateError(
        `A canceled appointment must have it's cancellation info`,
      );
    }

    return new AppointmentEntity(
      startTime,
      endTime,
      patientId,
      medicId,
      serviceId,
      status,
      type,
      patientCharge,
      medicEarning,
      billing,
      cancellation,
      preNotes,
      postNotes,
      completedAt,
      id,
    );
  }

  public cancel(cancellation: Cancellation) {
    if (!this.canBeCancelled())
      throw new AppointmentCanNotBeCancelled(
        `Appointmet with status: ${this.status} can not be cancelled`,
      );

    this.status = 'CANCELADA';
  }

  public complete() {
    if (!this.canBeCompleted())
      throw new AppointmentCanNotBeCompleted(
        `Appointment with status ${this.status} can not be marked as completed`,
      );
  }

  public markNoShow() {}

  public reSchedule() {
    if (!this.canBeReschedule())
      throw new AppointmentCanNotBeReschedule(
        `Appointmet with status ${this.status} can not be re-schedule`,
      );
  }

  private canBeCancelled(): boolean {
    return this.status === 'PROGRAMADA';
  }
  private canBeReschedule(): boolean {
    return this.status === 'PROGRAMADA';
  }
  private canBeCompleted(): boolean {
    return this.status === 'PROGRAMADA';
  }

  static validateEndDateLessThanStartDate(startTime: Date, endTime: Date) {
    if (endTime.getTime() <= startTime.getTime())
      throw new AppointmentDateError(`Start date can not be less tan end Date`);
  }

  static validateCompletedAtExistsOnStatusComplete(status: Status) {
    if (status === 'COMPLETADA') {
    }
  }

  public getSummary() {}

  public updateNotes() {}
}
