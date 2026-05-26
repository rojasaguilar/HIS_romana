import { useQuery } from "@tanstack/react-query";
import {
  getEncounterByAppointmentRequest,
  getEncounterByPatientIdRequest,
  searchCie10Request,
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

export const useSearchCie10 = (searchTerm: string) => {
  return useQuery({
    queryKey: ["cie10", "search", searchTerm],
    
    queryFn: () => searchCie10Request(searchTerm),
    
    // Solo se ejecuta si el término existe y tiene al menos 2 caracteres
    // para no saturar el backend con búsquedas de 1 sola letra.
    enabled: !!searchTerm && searchTerm.length >= 2,

    // Opcional: Evita que los resultados "parpadeen" si el usuario borra letras rápido
    staleTime: 1000 * 60 * 5, // La data se considera fresca por 5 min
  });
};