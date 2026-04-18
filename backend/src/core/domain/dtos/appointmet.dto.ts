import { Status } from '../types/appointment-status.type';
import { Billing } from '../types/billing.type';
import { CancellationDTO } from '../value-objects/cancellation.vo';

export interface AppointmentDTO {
  patientId: string;
  serviceId: string;
  billing: Billing;
  startDate: Date;
  medicId: string;
  type: 'IN_PERSON' | 'ONLINE';
  preNotes?: string;
}
