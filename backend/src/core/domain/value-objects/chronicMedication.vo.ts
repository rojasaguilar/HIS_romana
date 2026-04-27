import { Dosage } from './dosage.vo';
import { Frecuency } from './frecuency.vo';

export class ChronicMedication {
  constructor(
    public medicationName: string,
    public doasge: Dosage,
    public frecuency: Frecuency,
    public startedAt: Date,
  ) {
    if (medicationName.length <= 0)
      throw new Error(`Invalid name for a Medication`);
  }
}
