import { useMutation } from "@tanstack/react-query";

import { createMedicRequest } from "../api/medics.api";

export const useCreateMedic =
  () => {
    return useMutation({
      mutationFn:
        createMedicRequest,
    });
  };