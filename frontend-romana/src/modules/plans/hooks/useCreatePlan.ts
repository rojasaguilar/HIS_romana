import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlanRequest } from "../api/plans.api";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlanRequest,
    onSuccess: () => {
      // Invalidamos la lista para que al regresar vea el plan nuevo
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};
