// Extraemos la receta a su propia interfaz para que sea más fácil tipar formularios
export interface PrescriptionDTO {
  medicationName: string;
  dosage: { amount: number; unit: string };
  frequency: string;
  startDate: string; // Se manda/recibe como ISO string (ej. "2026-05-14T10:00:00.000Z")
  endDate: string; // Se manda/recibe como ISO string
}

export interface CreateEncounterDTO {
  patientId: string;
  medicId: string;
  appointmentId: string;
  symptoms: string;
  notes?: string; // Opcional, como el default: null de Mongoose
  preliminaryDiagnosis: string;
  differentialDiagnosis: string;
  prescriptions: PrescriptionDTO[];
}

// La entidad completa que te devuelve el backend al hacer un GET o un POST exitoso
export interface Encounter extends CreateEncounterDTO {
  id: string; // Mongoose devuelve _id, pero asumo que en tu backend lo mapeas a id
}
