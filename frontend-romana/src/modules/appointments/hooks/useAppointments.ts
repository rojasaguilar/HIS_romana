import { useQuery } from "@tanstack/react-query";

import { getAppointmentsRequest } from "../api/appointments.api";

export const useAppointments =
  () => {
    return useQuery({
      queryKey: [
        "appointments",
      ],

      queryFn:
        getAppointmentsRequest,
    });
  };