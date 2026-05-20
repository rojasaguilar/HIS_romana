import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UpdatePatientDTO } from "../dtos/update-patient.dto";
import type { Patient } from "../types/patient.types";
import { updatePatientRequest } from "../api/patients.api";

interface UpdatePatientPayload {
  id: string;
  data: UpdatePatientDTO;
}

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation<Patient, Error, UpdatePatientPayload>({
    mutationFn: ({ id, data }) => updatePatientRequest(id, data),

    onSuccess: (updatedPatient) => {
      // Refresca lista de pacientes
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      // Refresca detalle del paciente
      queryClient.invalidateQueries({
        queryKey: ["patient", updatedPatient.id],
      });

      // Actualiza cache inmediatamente
      queryClient.setQueryData(["patient", updatedPatient.id], updatedPatient);
    },
  });
};
