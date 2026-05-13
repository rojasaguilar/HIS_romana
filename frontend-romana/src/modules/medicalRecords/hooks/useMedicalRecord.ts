import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMedicalRecordByPatientIdRequest,
  createMedicalRecordRequest,
  updateMedicalRecordRequest,
} from "../api/medical-record.api";
import type { CreateMedicalRecordDTO, UpdateMedicalRecordDTO } from "../dtos/medical-record.dto";


/**
 * Caso de Uso: Obtener el expediente médico de un paciente
 */
export const useMedicalRecordByPatient = (patientId: string | undefined) => {
  return useQuery({
    // La key incluye el patientId para cachear cada paciente por separado
    queryKey: ["medicalRecord", "patient", patientId],
    queryFn: () => getMedicalRecordByPatientIdRequest(patientId!),
    // Solo dispara la petición si realmente tenemos un ID (evita errores 400)
    enabled: !!patientId,
    // (Opcional) Si un paciente nuevo no tiene record y tu backend tira 404,
    // puedes decirle a React Query que no reintente a lo loco:
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    }
  });
};

/**
 * Caso de Uso: Crear un nuevo expediente médico
 */
export const useCreateMedicalRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMedicalRecordDTO) => createMedicalRecordRequest(data),
    onSuccess: (newRecord, variables) => {
      // Invalidamos el caché específico del paciente para que se recargue la data
      queryClient.invalidateQueries({ 
        queryKey: ["medicalRecord", "patient", variables.patientId] 
      });
    },
  });
};

/**
 * Caso de Uso: Actualizar un expediente médico existente
 */
export const useUpdateMedicalRecord = (patientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMedicalRecordDTO }) =>
      updateMedicalRecordRequest(id, data),
    onSuccess: () => {
      // Refrescamos la vista usando el patientId que pasamos al hook
      queryClient.invalidateQueries({ 
        queryKey: ["medicalRecord", "patient", patientId] 
      });
    },
  });
};