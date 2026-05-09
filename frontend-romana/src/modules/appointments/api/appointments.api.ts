import { api } from "@/shared/lib/axios";

import type { Appointment } from "../types/appointment.types";

import type { CreateAppointmentDTO } from "../dtos/create-appointment.dto";

export const getAppointmentsRequest = async (): Promise<Appointment[]> => {
  const response = await api.get("/appointments");

  return response.data.appointments;
};

export const createAppointmentRequest = async (
  data: CreateAppointmentDTO,
): Promise<Appointment> => {
  const response = await api.post("/appointments", data);

  return response.data;
};
