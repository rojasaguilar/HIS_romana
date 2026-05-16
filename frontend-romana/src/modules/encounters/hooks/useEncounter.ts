import { useQuery } from "@tanstack/react-query";
import {
  getEncounterByAppointmentRequest,
  getEncounterByPatientIdRequest,
} from "../api/encounters.api";

/**
 * Caso de Uso: Obtener la nota clínica de una cita específica
 */
export const useEncounterByAppointment = (
  appointmentId: string | undefined,
) => {
  return useQuery({
    queryKey: ["encounter", "appointment", appointmentId],
    queryFn: () => getEncounterByAppointmentRequest(appointmentId!),
    enabled: !!appointmentId,
    retry: (failureCount, error: any) => {
      // Si la cita no tiene nota aún, evitamos reintentos innecesarios
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
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
