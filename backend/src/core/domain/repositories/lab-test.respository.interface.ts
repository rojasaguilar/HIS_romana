import { LabTestEntity } from '../entities/lab-test.entity';
import { ClientSession } from 'mongoose';

export interface ILabTestRepository {
  create(
    labTest: LabTestEntity,
    session?: ClientSession,
  ): Promise<LabTestEntity>;
  createMany(
    labTests: LabTestEntity[],
    session?: ClientSession,
  ): Promise<LabTestEntity[]>;
  update(labTest: LabTestEntity): Promise<LabTestEntity>;
  findById(id: string): Promise<LabTestEntity | null>;
  findByPatientId(patientId: string): Promise<LabTestEntity[]>;
  findByEncounterId(encounterId: string): Promise<LabTestEntity[]>;
  findPendingByPatientId(patientId: string): Promise<LabTestEntity[]>;
}
