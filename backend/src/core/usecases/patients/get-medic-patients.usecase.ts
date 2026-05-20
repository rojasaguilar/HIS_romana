// src/modules/patient/application/use-cases/get-medic-patients.usecase.ts

import PatientEntity from '../../domain/entities/patient.entity';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
// import { ISystemAccountRepository } from '../../domain/repositories/systemAccount.repository.interface';

export class GetMedicPatientsUseCase {
  constructor(
    private readonly patientRepo: IPatientRepository,
    private readonly appointmentRepo: IAppointmentRepository,
    // private readonly systemAccountRepo: ISystemAccountRepository,
  ) {}

  async execute(medicId: string): Promise<PatientEntity[]> {
    // Obtener citas del médico
    const appointments = await this.appointmentRepo.filter({
      medicId,
    });

    // Obtener IDs únicos de pacientes
    const patientIds = [
      ...new Set(appointments.map((appointment) => appointment.patientId)),
    ];

    if (patientIds.length === 0) {
      return [];
    }

    // Buscar pacientes
    return await this.patientRepo.findByIds(patientIds);
  }
}
