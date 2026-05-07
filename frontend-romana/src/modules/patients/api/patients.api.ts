import { api } from "@/shared/lib/axios";

import type { Patient } from "../types/patient.types";
import type { CreatePatientDTO } from "../dtos/create-patient-dto";

export const createPatientRequest = async (
  data: CreatePatientDTO,
): Promise<Patient> => {
  const response = await api.post("/patients", data);

  return response.data;
};

export const getPatientsRequest = async (): Promise<Patient[]> => {
  const response = await api.get("/patients");

  return response.data;
};
