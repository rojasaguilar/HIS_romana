import { AppointmentDTO } from '../../domain/dtos/appointmet.dto';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import { AppointmentFactory } from '../../domain/factories/appointment.factory';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { IMedicRepository } from '../../domain/repositories/medic.repository.interface';
import { MedicNotFoundError } from '../../domain/errors/medic.error';
import { PatientNotFoundError } from '../../domain/errors/patient.errors';
import {
  ServiceCanNotBePerformedByMedicError,
  ServiceModalityError,
  ServiceNotFoundError,
} from '../../domain/errors/service.error';
import { AppointmentDateError } from '../../domain/errors/appointment.error';

export class ScheduleAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly serviceRepository: IServicesRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly medicRepository: IMedicRepository,
  ) {}

  async execute(dto: AppointmentDTO) {
    //1. Verificar si existe paciente
    const patient = await this.patientRepository.findById(dto.patientId);

    if (!patient)
      throw new PatientNotFoundError(
        `Patient with id: ${dto.patientId} not found`,
      );

    //2. Verificar si existe servicio
    const service = await this.serviceRepository.findById(dto.serviceId);

    if (!service)
      throw new ServiceNotFoundError(
        `Service with id: ${dto.serviceId} not found`,
      );

    if (!service.containsModality(dto.type))
      throw new ServiceModalityError(
        `Service is not eligible for modality ${dto.type}`,
      );

    //3. Verificar si existe médico
    const medic = await this.medicRepository.findById(dto.medicId);

    if (!medic)
      throw new MedicNotFoundError(`Medic with id: ${dto.medicId} not found`);

    //4. Puede medico hacer esto?

    if (!service.canBePerformedByMedic(medic))
      throw new ServiceCanNotBePerformedByMedicError(``);

    //5. horario disponible?
    const overlaps = await this.appointmentRepository.overlaps(
      dto.medicId,
      dto.startDate,
      service.duration,
    );

    if (overlaps)
      throw new AppointmentDateError(
        `Medic already has an appointment in this time slot`,
      );

    const newAppointment = AppointmentFactory.schedule(dto, service, medic);

    return await this.appointmentRepository.save(newAppointment);
  }
}
