import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateEncounterDTO } from "../dtos/encounter.dto";
import {
  updateEncounterRequest,
  createEncounterRequest,
} from "../api/encounters.api";

export const useSaveEncounter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id?: string;
      data: CreateEncounterDTO;
    }) => {
      // UPDATE
      if (id) {
        return updateEncounterRequest(id, data);
      }

      // CREATE
      return createEncounterRequest(data);
    },

    onSuccess: (_, variables) => {
      // RECARGAR ENCOUNTER

      queryClient.invalidateQueries({
        queryKey: ["encounter", variables.data.appointmentId],
      });

      // RECARGAR LAB TESTS SI LOS USAS

      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: ["encounter-lab-tests", variables.id],
        });
      }
    },
  });
};
