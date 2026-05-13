import { useMutation, useQueryClient } from "@tanstack/react-query";

import { rescheduleAppointmentRequest } from "./../api/appointments.api";

export const useRescheduleAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rescheduleAppointmentRequest,

    onSuccess: (_, appointmentId) => {
      /**
       * REFRESH DETAILS
       */
      queryClient.invalidateQueries({
        queryKey: ["appointment", appointmentId],
      });

      /**
       * OPTIONAL:
       * refresh appointment list
       */
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
};
