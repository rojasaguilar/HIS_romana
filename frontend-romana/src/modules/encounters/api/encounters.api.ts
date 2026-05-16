import { api } from "@/shared/lib/axios";
import type { CreateEncounterDTO, Encounter } from "../dtos/encounter.dto";
// Asumiendo que guardaste los DTOs y la Entidad en esta ruta

export const getEncounterByPatientIdRequest = async (
  patientId: string,
): Promise<Encounter> => {
  // Ajusta la ruta si en tu backend la dejaste como /medical-records/patient/:patientId
  const response = await api.get(`/encounters/patients/${patientId}`);
  return response.data;
};

export const getEncounterByAppointmentRequest = async (
  appointmentId: string,
): Promise<Encounter> => {
  // Ajusta la ruta si en tu backend la dejaste como /medical-records/patient/:appointmentId
  const response = await api.get(`/encounters/appointment/${appointmentId}`);
  return response.data;
};

export const createEncounterRequest = async (
  data: CreateEncounterDTO,
): Promise<Encounter> => {
  const response = await api.post("/encounters", data);
  return response.data;
};

// export const updateMedicalRecordRequest = async (
//   id: string,
//   data: UpdateMedicalRecordDTO
// ): Promise<MedicalRecord> => {
//   const response = await api.put(`/medicalRecords/${id}`, data);
//   return response.data;
// };
