import { useQuery } from "@tanstack/react-query";
import { getAppointmentByIdRequest } from "./../api/appointments.api";

export const useAppointmentDetails = (id: string) => {
  return useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getAppointmentByIdRequest(id),
    enabled: !!id,
  });
};
