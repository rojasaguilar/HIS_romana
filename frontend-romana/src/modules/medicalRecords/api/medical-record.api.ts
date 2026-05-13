import { api } from "@/shared/lib/axios";
import type { CreateMedicalRecordDTO, UpdateMedicalRecordDTO } from "../dtos/medical-record.dto";
// Asumiendo que guardaste los DTOs y la Entidad en esta ruta


// (Opcional) Define la interfaz de retorno si no la tienes exportada
export interface MedicalRecord extends CreateMedicalRecordDTO {
  id: string;
}

export const getMedicalRecordByPatientIdRequest = async (patientId: string): Promise<MedicalRecord> => {
  // Ajusta la ruta si en tu backend la dejaste como /medical-records/patient/:patientId
  const response = await api.get(`/medicalRecords/patients/${patientId}`);
  return response.data;
};

export const createMedicalRecordRequest = async (
  data: CreateMedicalRecordDTO
): Promise<MedicalRecord> => {
  const response = await api.post("/medicalRecords", data);
  return response.data;
};

export const updateMedicalRecordRequest = async (
  id: string, 
  data: UpdateMedicalRecordDTO
): Promise<MedicalRecord> => {
  const response = await api.put(`/medicalRecords/${id}`, data);
  return response.data;
};