import { useMutation } from "@tanstack/react-query";

import { createServiceRequest } from "../api/services.api";

export const useCreateService =
  () => {
    return useMutation({
      mutationFn:
        createServiceRequest,
    });
  };