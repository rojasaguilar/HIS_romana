export type AppointmentStatus =
  | "PROGRAMADA"
  | "COMPLETADA"
  | "CANCELADA"
  | "NO_ASISTIO";

export type AppointmentType =
  | "IN_PERSON"
  | "ONLINE";

export type BillingSource =
  | "DIRECT"
  | "PROMOTION"
  | "SUBSCRIPTION";

export interface Billing {
  source: BillingSource;

  promotionId?: string;

  subscriptionId?: string;
}

export interface Appointment {
  id: string;

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

  postNotes?: string;

  completedAt?: string;
}