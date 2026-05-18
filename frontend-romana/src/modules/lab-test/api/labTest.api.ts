import { api } from "@/shared/lib/axios";
import type {
  CreateLabTestDTO,
  UpdateLabTestResultsDTO,
} from "../dtos/lab-test.dto";
import type { LabTest } from "../types/lab-test.types";

/**
 * Crear estudio de laboratorio
 */
export const createLabTestRequest = async (
  data: CreateLabTestDTO,
): Promise<LabTest> => {
  const response = await api.post("/lab-tests", data);

  return response.data;
};

/**
 * Obtener estudio por id
 */
export const getLabTestByIdRequest = async (id: string): Promise<LabTest> => {
  const response = await api.get(`/lab-tests/${id}`);

  return response.data;
};

/**
 * Obtener estudios de un paciente
 */
export const getPatientLabTestsRequest = async (
  patientId: string,
): Promise<LabTest[]> => {
  const response = await api.get(`/lab-tests/patient/${patientId}`);

  return response.data.labTests;
};

export const getEncounterLabTestsRequest = async (
  encounterId: string,
): Promise<LabTest[]> => {
  const response = await api.get(`/lab-tests/encounter/${encounterId}`);

  return response.data;
};

/**
 * Completar estudio y subir resultados
 */
export const completeLabTestRequest = async (
  id: string,
  data: UpdateLabTestResultsDTO,
): Promise<LabTest> => {
  const response = await api.patch(`/lab-tests/${id}/complete`, data);

  return response.data;
};
