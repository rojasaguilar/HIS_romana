import { api } from "@/shared/lib/axios";

import type { Medic } from "../types/medic.types";

import type { CreateMedicDTO } from "../dtos/create-medic.dto";

export const getMedicsRequest = async (): Promise<Medic[]> => {
  const response = await api.get("/medics");

  return response.data;
};

export const getMedicAppointmentsRequest = async (medicId: string) => {
  // Esto genera la ruta: /appointments?medicId=el_id_del_medico
  const response = await api.get("/appointments", {
    params: { medicId },
  });
  return response.data.appointments;
};

export const getMedicByIdRequest = async (id: string): Promise<Medic> => {
  const response = await api.get(`/medics/${id}`);
  return response.data;
};

export const createMedicRequest = async (
  data: CreateMedicDTO,
): Promise<Medic> => {
  const response = await api.post("/medics", data);

  return response.data;
};
