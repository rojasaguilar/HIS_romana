import { api } from "@/shared/lib/axios";
import type { Receptionist } from "../types/receptionist.types";
import type { CreateReceptionistDTO } from "../dtos/receptionist.dto";

export const getReceptionistsRequest = async (): Promise<Receptionist[]> => {
  const response = await api.get("/receptionists");
  // Ajusta el return si tu backend envuelve los datos en response.data.receptionists o similar
  return response.data.receptionists;
};

export const getReceptionistByIdRequest = async (
  id: string,
): Promise<Receptionist> => {
  const response = await api.get(`/receptionists/${id}`);
  return response.data;
};

export const createReceptionistRequest = async (
  data: CreateReceptionistDTO,
): Promise<Receptionist> => {
  const response = await api.post("/receptionists", data);
  return response.data;
};
