import type {
  AppointmentStatus,
  AppointmentType,
  Billing,
} from "../types/appointment.types";

export interface CreateAppointmentDTO {
  startDate: string;

  endTime: string;

  patientId: string;

  medicId: string;

  serviceId: string;

  status: AppointmentStatus;

  type: AppointmentType;

  patientCharge: number;

  medicEarning: number;

  billing: Billing;

  preNotes?: string;
}