import { ClientSession } from 'mongoose';
import {
  EncounterEntity,
  EncounterLabTestProps,
} from '../entities/encounter.entity';

export interface IEncounterRepository {
  create(
    encounter: EncounterEntity,
    session?: ClientSession,
  ): Promise<EncounterEntity>;
  findById(id: string): Promise<EncounterEntity | null>;
  findByAppointmentId(appointmentId: string): Promise<EncounterEntity | null>;
  findByPatientId(patientId: string): Promise<EncounterEntity[]>;
}
