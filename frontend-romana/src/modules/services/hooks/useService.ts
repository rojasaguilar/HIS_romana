import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceByIdRequest, updateServiceRequest } from "../api/services.api";
import type { UpdateServiceDTO } from "../dtos/update-service.dto"; // Ajusta el path a tu DTO

// 1. Creamos una interfaz para agrupar lo que le vamos a mandar al mutate
interface UpdateServiceVariables {
  serviceId: string;
  data: UpdateServiceDTO;
}

export const useService = (id: string) => {
  return useQuery({
    queryKey: ["services", id],
    queryFn: () => getServiceByIdRequest(id),
    enabled: !!id,
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 2. Recibimos un solo objeto, desestructuramos, y le pasamos los 2 argumentos a tu API
    mutationFn: ({ serviceId, data }: UpdateServiceVariables) =>
      updateServiceRequest(serviceId, data),

    onSuccess: (_, variables) => {
      // Usamos el serviceId de las variables para invalidar el caché correcto
      queryClient.invalidateQueries({
        queryKey: ["services", variables.serviceId],
      });
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
