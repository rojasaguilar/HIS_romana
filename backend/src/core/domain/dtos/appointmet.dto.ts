import { Status } from '../types/appointment-status.type';
import { Billing } from '../types/billing.type';
import {
  Cancellation,
  CancellationDTO,
} from '../value-objects/cancellation.vo';

export interface AppointmentDTO {
  patientId: string;
  serviceId: string;
  billing: Billing;
  startDate: Date;
  medicId: string;
  type: 'IN_PERSON' | 'ONLINE';
  preNotes?: string;
}

export interface CreateAppointmentDTO {
  startDate: Date | string;
  endTime: Date | string;

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
  completedAt?: Date | string;

  id?: string;
}

export interface FilterAppointmentDTO {
  startDate: Date | string;
  endTime: Date | string;

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
  completedAt?: Date | string;

  id?: string;
}

export interface RescheduleAppointmentDTO {
  startDate: Date | string;
  endTime: Date | string;

  medicId?: string;
}

export interface UpdateAppointmentDTO {
  startDate: Date | string;
  endTime: Date | string;

  medicId?: string;

  status?: Status;
  type?: 'IN_PERSON' | 'ONLINE';

  cancellation?: CancellationDTO;
  preNotes?: string;
  postNotes?: string;
  completedAt?: Date | string;
}
