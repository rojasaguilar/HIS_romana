// hooks/useLabTest.ts

import { useQuery } from "@tanstack/react-query";
import { getLabTestByIdRequest } from "../api/labTest.api";


export const useLabTest = (id: string) => {
  return useQuery({
    queryKey: ["lab-test", id],

    queryFn: () => getLabTestByIdRequest(id),

    enabled: !!id,
  });
};