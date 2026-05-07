import { useQuery } from "@tanstack/react-query";

import { getPatientsRequest } from "../api/patients.api";

export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],

    queryFn: getPatientsRequest,
  });
};