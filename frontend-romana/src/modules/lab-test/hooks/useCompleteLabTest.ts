// hooks/useCompleteLabTest.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";



import type { UpdateLabTestResultsDTO } from "../dtos/lab-test.dto";
import { completeLabTestRequest } from "../api/labTest.api";

interface CompleteLabTestParams {
  id: string;
  data: UpdateLabTestResultsDTO;
}

export const useCompleteLabTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: CompleteLabTestParams) =>
      completeLabTestRequest(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["lab-test", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["lab-tests"],
      });
    },
  });
};