import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReceptionistRequest } from "../api/receptionists.api";
import type { CreateReceptionistDTO } from "../dtos/receptionist.dto";

export const useCreateReceptionist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReceptionistDTO) => createReceptionistRequest(data),
    onSuccess: () => {
      // Esto hace que la lista se vuelva a pedir al backend tras guardar exitosamente
      queryClient.invalidateQueries({ queryKey: ["receptionists"] });
    },
    onError: (error) => {
      // Aquí podrías agregar un toast o notificación global si falla
      console.error("Error al crear recepcionista:", error);
    }
  });
};