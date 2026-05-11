import { useQuery } from "@tanstack/react-query";
import { getMedicAppointmentsRequest, getMedicByIdRequest } from "../api/medics.api";

export const useMedicDetails = (id: string) => {
  return useQuery({
    queryKey: ["medics", id],
    queryFn: () => getMedicByIdRequest(id),
    enabled: !!id, // Solo se ejecuta si hay un ID válido
  });
};

export const useMedicAppointments = (medicId: string) => {
  return useQuery({
    queryKey: ["appointments", "medic", medicId],
    queryFn: () => getMedicAppointmentsRequest(medicId),
    enabled: !!medicId, // Solo se ejecuta si hay un ID
  });
};