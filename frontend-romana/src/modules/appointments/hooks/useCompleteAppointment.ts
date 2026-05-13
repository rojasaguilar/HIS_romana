import { useMutation, useQueryClient } from "@tanstack/react-query";

import { completeAppointmentRequest } from "./../api/appointments.api";

export const useCompleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeAppointmentRequest,

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
