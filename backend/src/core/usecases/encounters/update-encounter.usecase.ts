import mongoose from 'mongoose';

import {
  EncounterProps,
  EncounterEntity,
} from '../../domain/entities/encounter.entity';

import { MedicNotFoundError } from '../../domain/errors/medic.error';
import { PatientNotFoundError } from '../../domain/errors/patient.errors';
// Asumo que tienes o crearás este error

import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import { IEncounterRepository } from '../../domain/repositories/encounter.repository.interface';
import { IMedicRepository } from '../../domain/repositories/medic.repository.interface';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { ILabTestRepository } from '../../domain/repositories/lab-test.respository.interface';
import { LabTestEntity } from '../../domain/entities/lab-test.entity';

export class UpdateEncounterUseCase {
  constructor(
    private readonly encounterRepository: IEncounterRepository,
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly medicRepository: IMedicRepository,
    private readonly labTestRepository: ILabTestRepository,
  ) {}

  public async execute(
    id: string,
    data: Partial<EncounterProps>,
  ): Promise<EncounterEntity> {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const { medicId, patientId, appointmentId, labTests } = data;

      // 1. VALIDAR QUE EL ENCOUNTER A EDITAR EXISTA
      const existingEncounter = await this.encounterRepository.findById(id);

      if (!existingEncounter) {
        throw new Error(`Encounter con id: ${id} no encontrado`);
      }

      // 2. VALIDACIONES DE RELACIONES (Solo si vienen en el payload para ser actualizadas)
      if (patientId) {
        const patientExists = await this.patientRepository.findById(patientId);
        if (!patientExists)
          throw new PatientNotFoundError(
            `Paciente con id: ${patientId} no encontrado`,
          );
      }

      if (medicId) {
        const medicExists = await this.medicRepository.findById(medicId);
        if (!medicExists)
          throw new MedicNotFoundError(
            `Medico con id: ${medicId} no encontrado`,
          );
      }

      if (appointmentId) {
        const appointmentExists =
          await this.appointmentRepository.findById(appointmentId);
        if (!appointmentExists)
          throw new Error(`Cita con id: ${appointmentId} no encontrada`); // Corregí el PatientNotFoundError de tu código original
      }

      // 3. ACTUALIZAR ENCOUNTER
      // Asume que el repositorio tiene un método update que recibe el id, los datos parciales y la sesión
      const updatedEncounter = await this.encounterRepository.update(
        id,
        data,
        session,
      );

      // 4. MANEJO DE LAB TESTS
      // Si mandan un array de labTests en la actualización
      if (labTests && labTests.length > 0) {
        // NOTA: Dependiendo de tu regla de negocio, aquí podrías necesitar eliminar
        // los estudios anteriores (ej. this.labTestRepository.deleteByEncounterId(id))
        // antes de crear los nuevos, o simplemente agregar los nuevos.

        // Usamos los IDs nuevos si se mandaron, o los que ya tenía el encounter
        const finalPatientId = patientId || existingEncounter.patientId;
        const finalMedicId = medicId || existingEncounter.medicId;

        await this.labTestRepository.createMany(
          labTests.map((labTest) =>
            LabTestEntity.create({
              ...labTest,
              patientId: finalPatientId,
              orderedBy: finalMedicId,
              encounterId: id,
            }),
          ),
          session,
        );
      }

      await session.commitTransaction();

      return updatedEncounter;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
