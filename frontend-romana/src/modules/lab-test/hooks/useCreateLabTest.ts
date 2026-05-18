// useCreateLabTest.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLabTestRequest } from "../api/labTest.api";


export const useCreateLabTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLabTestRequest,

    onSuccess: (_, variables) => {
      // Refetch estudios del encounter
      queryClient.invalidateQueries({
        queryKey: [
          "encounter-lab-tests",
          variables.encounterId,
        ],
      });

      // OPCIONAL:
      // refresca también encounter si ahí tienes contadores
      queryClient.invalidateQueries({
        queryKey: ["encounter"],
      });
    },
  });
};