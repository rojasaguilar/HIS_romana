import { ClientSession } from 'mongoose';
import {
  EncounterEntity,
  EncounterLabTestProps,
  EncounterProps,
} from '../entities/encounter.entity';

export interface IEncounterRepository {
  create(
    encounter: EncounterEntity,
    session?: ClientSession,
  ): Promise<EncounterEntity>;
  findById(id: string): Promise<EncounterEntity | null>;
  update(
    id: string,
    data: Partial<EncounterProps>,
    session?: ClientSession,
  ): Promise<EncounterEntity | null>;
  findByAppointmentId(appointmentId: string): Promise<EncounterEntity | null>;
  findByPatientId(patientId: string): Promise<EncounterEntity[]>;
}
