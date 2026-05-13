import { api } from "@/shared/lib/axios";

import type { Appointment } from "../types/appointment.types";

import type { CreateAppointmentDTO } from "../dtos/create-appointment.dto";

export const getAppointmentsRequest = async (): Promise<Appointment[]> => {
  const response = await api.get("/appointments");

  return response.data.appointments;
};

export const getAppointmentByIdRequest = async (id: string) => {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
};

export const createAppointmentRequest = async (
  data: CreateAppointmentDTO,
): Promise<Appointment> => {
  const response = await api.post("/appointments", data);

  return response.data;
};

export const rescheduleAppointmentRequest = async (
 appointment: { id:string, startDate: Date}
): Promise<Appointment> => {
  const response = await api.patch(`/appointments/${appointment.id}/reschedule`,{startDate: appointment.startDate})
  return response.data;
}

export const completeAppointmentRequest = async (
  id: string,
) => {
  const response = await api.patch(
    `/appointments/${id}/complete`,
  );

  return response.data;
};
