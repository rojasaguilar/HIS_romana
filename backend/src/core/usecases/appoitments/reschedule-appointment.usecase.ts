import { AppointmentEntity } from '../../domain/entities/appointment.entity';
import { ServiceEntity } from '../../domain/entities/services.entity';
import {
  AppointmentCanNotBeReschedule,
  AppointmentDateError,
  AppointmentNotFoundError,
} from '../../domain/errors/appointment.error';
import { ServiceNotFoundError } from '../../domain/errors/service.error';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';

export class RescheduleAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly serviceRepository: IServicesRepository,
  ) {}

  async execute(id: string, newStartDate: Date): Promise<AppointmentEntity> {
    const appointmentExists = await this.appointmentRepository.findById(id);

    if (!appointmentExists)
      throw new AppointmentNotFoundError(
        `Appointment with id: ${id} does not exists`,
      );

    if (!appointmentExists.canBeReschedule())
      throw new AppointmentCanNotBeReschedule(
        `An appointment with a status of ${appointmentExists.status} can not be reschedule`,
      );

    const { patientId, medicId, serviceId } = appointmentExists;

    const service: ServiceEntity | null =
      await this.serviceRepository.findById(serviceId);

    if (!service)
      throw new ServiceNotFoundError(`Service with id: ${id} not found`);

    //calculate new end time
    const newEndTime = new Date(
      newStartDate.getTime() + service.duration * 60 * 1000,
    );

    const overlaps = await this.appointmentRepository.overlaps(
      patientId,
      medicId,
      newStartDate,
      newEndTime,
    );

    if (overlaps)
      throw new AppointmentCanNotBeReschedule(`Time slot not available`);

    const updatedAppointment = await this.appointmentRepository.update(id, {
      startDate: newStartDate,
      endTime: newEndTime,
    });

    if (!updatedAppointment)
      throw new AppointmentCanNotBeReschedule(
        `Error on reschedule appointment with id: ${id}`,
      );

    return AppointmentEntity.create({ ...updatedAppointment });
  }
}
