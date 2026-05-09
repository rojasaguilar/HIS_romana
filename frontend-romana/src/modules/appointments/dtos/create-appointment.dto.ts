import type {
  AppointmentType,
  Billing,
} from "../types/appointment.types";

export interface CreateAppointmentDTO {
  startDate: string;

  patientId: string;

  medicId: string;

  serviceId: string;

  type: AppointmentType;

  patientCharge: number;

  medicEarning: number;

  billing: Billing;

  preNotes?: string;
}