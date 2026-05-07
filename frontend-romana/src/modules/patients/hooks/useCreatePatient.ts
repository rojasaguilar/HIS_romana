import { useMutation } from "@tanstack/react-query";

import { createPatientRequest } from "../api/patients.api";

export const useCreatePatient =
  () => {
    return useMutation({
      mutationFn:
        createPatientRequest,
    });
  };