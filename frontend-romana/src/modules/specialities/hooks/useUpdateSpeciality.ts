import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpecialityRequest } from "../api/specialities.api";

export const useUpdateSpeciality = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSpecialityRequest,
    onSuccess: () => {
      // Invalidamos la lista para que la tabla se refresque sola
      queryClient.invalidateQueries({ queryKey: ["specialities"] });
    },
  });
};