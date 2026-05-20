import { useQuery } from "@tanstack/react-query";
import {
  getEncounterByAppointmentRequest,
  getEncounterByPatientIdRequest,
} from "../api/encounters.api";

/**
 * Caso de Uso: Obtener la nota clínica de una cita específica
 */
export const useEncounterByAppointment = (appointmentId: string) => {
  return useQuery({
    queryKey: ["encounter", appointmentId],

    queryFn: () => getEncounterByAppointmentRequest(appointmentId),

    enabled: !!appointmentId,
  });
};
/**
 * Caso de Uso: Obtener todo el historial de notas clínicas de un paciente
 */
export const usePatientEncounters = (patientId: string | undefined) => {
  return useQuery({
    queryKey: ["encounters", "patient", patientId],
    queryFn: () => getEncounterByPatientIdRequest(patientId!),
    enabled: !!patientId,
  });
};
