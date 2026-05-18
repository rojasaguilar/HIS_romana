import mongoose from 'mongoose';

import {
  EncounterProps,
  EncounterEntity,
} from '../../domain/entities/encounter.entity';

import { MedicNotFoundError } from '../../domain/errors/medic.error';
import { PatientNotFoundError } from '../../domain/errors/patient.errors';

import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import { IEncounterRepository } from '../../domain/repositories/encounter.repository.interface';
import { IMedicRepository } from '../../domain/repositories/medic.repository.interface';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { ILabTestRepository } from '../../domain/repositories/lab-test.respository.interface';
import { LabTestEntity } from '../../domain/entities/lab-test.entity';

export class CreateEncounterUseCase {
  constructor(
    private readonly encounterRepository: IEncounterRepository,

    private readonly appointmentRepository: IAppointmentRepository,

    private readonly patientRepository: IPatientRepository,

    private readonly medicRepository: IMedicRepository,

    private readonly labTestRepository: ILabTestRepository,
  ) {}

  public async execute(data: EncounterProps): Promise<EncounterEntity> {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const { medicId, patientId, appointmentId, labTests = [] } = data;

      console.log('lab tests', labTests);

      // VALIDACIONES
      const patientExists = await this.patientRepository.findById(patientId);

      if (!patientExists)
        throw new PatientNotFoundError(
          `Paciente con id: ${patientId} no encontrado`,
        );

      const medicExists = await this.medicRepository.findById(medicId);

      if (!medicExists)
        throw new MedicNotFoundError(`Medico con id: ${medicId} no encontrado`);

      const appointmentExists =
        await this.appointmentRepository.findById(appointmentId);

      if (!appointmentExists)
        throw new PatientNotFoundError(
          `Cita con id: ${appointmentId} no encontrada`,
        );

      // CREAR ENCOUNTER
      const encounter = EncounterEntity.create(data);

      const createdEncounter = await this.encounterRepository.create(
        encounter,
        session,
      );

      // CREAR LAB TESTS
      if (labTests.length > 0) {
        await this.labTestRepository.createMany(
          labTests.map((labTest) =>
            LabTestEntity.create({
              ...labTest,

              patientId,

              orderedBy: medicId,

              encounterId: createdEncounter.id!,
            }),
          ),

          session,
        );
      }

      await session.commitTransaction();

      return createdEncounter;
    } catch (error) {
      await session.abortTransaction();

      throw error;
    } finally {
      session.endSession();
    }
  }
}
