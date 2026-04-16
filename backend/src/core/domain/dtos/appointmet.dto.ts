import { Status } from '../types/appointment-status.type';
import { Billing } from '../types/billing.type';
import { CancellationDTO } from '../value-objects/cancellation.vo';

export interface AppointmentDTO {
  patientId: string;
  serviceId: string;
  billing: Billing;
  startDate: Date;
  // endTime: Date; CALCULAR CON STARTDATE + SERVICE.TIME
  // status: Status; SIMEPRE SERÁ 'PROGRAMADA'
  medicId: string;
  type: 'IN_PERSON' | 'ONLINE';
  // patientCharge: number; obtener de service.cost
  // medicEarning: number; calcular a partir de service.cost con medic%
  // cancellation?: CancellationDTO;
  preNotes?: string;
  // postNotes?: string; no tiene sentido en schedule 
  // completedAt?: Date; no teie sentido si será programada
  // readonly id?: string; no hay un id de cita aún
}
