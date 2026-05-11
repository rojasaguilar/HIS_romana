import { useQuery } from "@tanstack/react-query";

import { getPatientByIdRequest } from "../api/patients.api";

export const usePatient = (
  id: string,
) => {
  return useQuery({
    queryKey: ["patient", id],

    queryFn: () =>
      getPatientByIdRequest(id),

    enabled: !!id,
  });
};