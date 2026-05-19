import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpecialityRequest } from "../api/specialities.api";

export const useCreateSpeciality = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSpecialityRequest,
    onSuccess: () => {
      // Invalidamos la lista para que al regresar vea el plan nuevo
      queryClient.invalidateQueries({ queryKey: ["specialities"] });
    },
  });
};
