import { api } from "@/shared/lib/axios";

import type { Speciality } from "../types/speciality.types";

export const getSpecialitiesRequest = async (): Promise<Speciality[]> => {
  const response = await api.get("/specialities");

  return response.data;
};

export const createSpecialityRequest = async (data: {
  name: string;
}): Promise<Speciality> => {
  const response = await api.post("/specialities", data);

  return response.data;
};

export const updateSpecialityRequest = async (data: {
  id: string; // <-- Vital para saber cuál actualizar
  name: string;
  isActive: boolean;
}): Promise<Speciality> => {
  // Pasamos el ID en la URL como es el estándar REST
  const response = await api.patch(`/specialities/${data.id}`, data);
  return response.data;
};