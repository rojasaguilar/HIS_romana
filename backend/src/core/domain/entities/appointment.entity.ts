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
    public startDate: Date,
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
  ) {
    this.validateEndDateLessThanStartDate();

    switch (this.status) {
      case 'COMPLETADA':
        this.validateCompletedState();
        break;
      case 'CANCELADA':
        this.validateCanceledState();
        break;
      case 'PROGRAMADA':
        this.validateScheduledState();
        break;
      case 'NO_ASISTIO':
        this.validateNoShowState();
        break;

      default:
        throw new AppointmentInconsistentStateError(
          `appointment status: [${this.status}] not valid`,
        );
    }
  }

  static create(data: {
    startDate: Date;
    endTime: Date;
    patientId: string;
    medicId: string;
    serviceId: string;
    status: Status;
    type: 'IN_PERSON' | 'ONLINE';
    patientCharge: number;
    medicEarning: number;
    billing: BillingVO;
    cancellation?: Cancellation;
    preNotes?: string;
    postNotes?: string;
    completedAt?: Date;
    id?: string;
  }) {
    return new AppointmentEntity(
      data.startDate,
      data.endTime,
      data.patientId,
      data.medicId,
      data.serviceId,
      data.status,
      data.type,
      data.patientCharge,
      data.medicEarning,
      data.billing,
      data.cancellation,
      data.preNotes,
      data.postNotes,
      data.completedAt,
      data.id,
    );
  }

  public cancel(cancellation: Cancellation) {
    if (!this.canBeCancelled())
      throw new AppointmentCanNotBeCancelled(
        `Appointmet with status: ${this.status} can not be cancelled`,
      );

    this.cancellation = cancellation;

    this.status = 'CANCELADA';

    //validaciones despues de cada 
  }

  public complete() {
    if (!this.canBeCompleted())
      throw new AppointmentCanNotBeCompleted(
        `Appointment with status ${this.status} can not be marked as completed`,
      );

    this.status = 'COMPLETADA';
    this.completedAt = new Date();
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

  //VALIDATIONS
  private validateEndDateLessThanStartDate() {
    if (this.endTime.getTime() <= this.startDate.getTime())
      throw new AppointmentDateError(`Start date can not be less tan end Date`);
  }

  private validateCompletedState() {
    if (!this.completedAt)
      throw new AppointmentInconsistentStateError(
        `A completed appointment must have a conclussion date`,
      );

    if (!this.patientCharge)
      throw new AppointmentInconsistentStateError(
        'A completed appointment must have a patient charge',
      );

    if (this.isInvalidPatientCharge())
      throw new AppointmentInconsistentStateError(
        `Invalid charge ${this.patientCharge}`,
      );

    if (this.billing.source === 'DIRECT')
      this.validateDirectBilling(this.patientCharge);

    if (this.isInvalidMedicCharge())
      throw new AppointmentInconsistentStateError(
        ' A completed appointment must have registered medic earning',
      );
  }

  private validateCanceledState(): void {
    if (!this.cancellation)
      throw new AppointmentInconsistentStateError(
        "A canceled appointment must have it's cancellation info",
      );
  }

  private validateScheduledState(): void {
    if (this.completedAt)
      throw new AppointmentInconsistentStateError(
        'An scheduled appointment can not have a completed date',
      );

    if (this.cancellation) {
      throw new AppointmentInconsistentStateError(
        'An scheduled appointment can not have cancellation info',
      );
    }
  }

  private validateNoShowState(): void {
    if (this.completedAt)
      throw new AppointmentInconsistentStateError(
        'If patient did not show, appointment can not have a conclussion date',
      );

    if (this.cancellation) {
      throw new AppointmentInconsistentStateError(
        'If patient did not show, appointment can not have cancellation info',
      );
    }

    if (this.isInvalidPatientCharge())
      throw new AppointmentInconsistentStateError(
        `Invalid charge ${this.patientCharge}`,
      );
  }

  private validateDirectBilling(patientCharge: number) {
    if (patientCharge <= 0) {
      throw new AppointmentInconsistentStateError(
        `An appointment with a billing type DIRECT must have a valid patient charge`,
      );
    }
    return;
  }

  private isInvalidMedicCharge(): boolean {
    return this.medicEarning === undefined || this.medicEarning === 0;
  }

  private isInvalidPatientCharge(): boolean {
    return this.patientCharge < 0;
  }

  public getSummary() {}

  public updateNotes() {}
}
