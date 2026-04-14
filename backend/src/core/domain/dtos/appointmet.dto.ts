import { Status } from '../types/appointment-status.type';
import { Billing } from '../types/billing.type';
import { CancellationDTO } from '../value-objects/cancellation.vo';

export interface AppointmentDTO {
  startDate: Date;
  endTime: Date;
  patientId: string;
  medicId: string;
  serviceId: string;
  status: Status;
  type: 'IN_PERSON' | 'ONLINE';
  patientCharge: number;
  medicEarning: number;
  billing: Billing;
  cancellation?: CancellationDTO;
  preNotes?: string;
  postNotes?: string;
  completedAt?: Date;
  readonly id?: string;
}
