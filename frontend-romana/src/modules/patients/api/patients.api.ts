import { api } from "@/shared/lib/axios";

import type { Patient } from "../types/patient.types";

import type { UpdatePatientDTO } from "../dtos/update-patient.dto";
import type { CreatePatientDTO } from "../dtos/create-patient-dto";

export const getPatientsRequest = async (): Promise<Patient[]> => {
  const response = await api.get("/patients");

  return response.data;
};

export const getPatientByIdRequest = async (
  patientId: string,
): Promise<Patient> => {
  const response = await api.get(`/patients/${patientId}`);

  return response.data;
};

export const createPatientRequest = async (
  data: CreatePatientDTO,
): Promise<Patient> => {
  const response = await api.post("/patients", data);

  return response.data;
};

export const updatePatientRequest = async (
  patientId: string,
  data: UpdatePatientDTO,
): Promise<Patient> => {
  const response = await api.patch(`/patients/${patientId}`, data);

  return response.data;
};

export const deletePatientRequest = async (
  patientId: string,
): Promise<void> => {
  await api.delete(`/patients/${patientId}`);
};
