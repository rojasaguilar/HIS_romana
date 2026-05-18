// hooks/usePatientLabTests.ts

import { useQuery } from "@tanstack/react-query";
import { getPatientLabTestsRequest } from "../api/labTest.api";


export const usePatientLabTests = (patientId: string) => {
  return useQuery({
    queryKey: ["patient-lab-tests", patientId],

    queryFn: () => getPatientLabTestsRequest(patientId),

    enabled: !!patientId,
  });
};