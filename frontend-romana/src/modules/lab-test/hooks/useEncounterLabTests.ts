// useEncounterLabTests.ts

import { useQuery } from "@tanstack/react-query";
import { getEncounterLabTestsRequest } from "../api/labTest.api";


export const useEncounterLabTests = (
  encounterId?: string,
) => {
  return useQuery({
    queryKey: ["encounter-lab-tests", encounterId],

    queryFn: () =>
      getEncounterLabTestsRequest(encounterId!),

    enabled: !!encounterId,
  });
};