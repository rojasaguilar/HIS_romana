import { Dosage } from './dosage.vo';
import { Frecuency } from './frecuency.vo';
import { RouteAdministration } from '../types/routeAdministration.type';

export class ChronicMedication {
  constructor(
    public medicationName: string,
    public routeAdministration: RouteAdministration,
    public dosage: Dosage,
    public frequency: Frecuency,
    public startedAt: Date,
  ) {
    if (medicationName.length <= 0)
      throw new Error(`Invalid name for a Medication`);
  }
}
