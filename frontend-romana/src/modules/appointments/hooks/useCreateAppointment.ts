import { useMutation } from "@tanstack/react-query";

import { createAppointmentRequest } from "../api/appointments.api";

export const useCreateAppointment =
  () => {
    return useMutation({
      mutationFn:
        createAppointmentRequest,
    });
  };