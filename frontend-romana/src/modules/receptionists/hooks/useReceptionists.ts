import { useQuery } from "@tanstack/react-query";
import { 
  getReceptionistsRequest, 
  getReceptionistByIdRequest 
} from "../api/receptionists.api";

export const useReceptionists = () => {
  return useQuery({
    queryKey: ["receptionists"],
    queryFn: getReceptionistsRequest,
  });
};

export const useReceptionistDetails = (id: string) => {
  return useQuery({
    queryKey: ["receptionists", id],
    queryFn: () => getReceptionistByIdRequest(id),
    enabled: !!id, // Solo se ejecuta si hay un ID válido (por ejemplo, al entrar al perfil)
  });
};