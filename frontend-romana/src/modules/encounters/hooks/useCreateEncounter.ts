import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEncounterRequest } from "../api/encounters.api";
import type { CreateEncounterDTO } from "../dtos/encounter.dto";

export const useCreateEncounter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEncounterDTO) => createEncounterRequest(data),
    onSuccess: (newEncounter, variables) => {
      // Invalidamos la nota de esta cita específica para que aparezca en la vista
      queryClient.invalidateQueries({
        queryKey: ["encounter", "appointment", variables.appointmentId],
      });

      // Invalidamos el historial del paciente para mantenerlo fresco
      queryClient.invalidateQueries({
        queryKey: ["encounters", "patient", variables.patientId],
      });
    },
  });
};