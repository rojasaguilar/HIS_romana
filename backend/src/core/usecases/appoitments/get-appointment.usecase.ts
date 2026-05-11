import { AppointmentNotFoundError } from '../../domain/errors/appointment.error';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';

export class GetAppointmentByIdUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(id: string) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment)
      throw new AppointmentNotFoundError(`Appointment with id:${id} not found`);

    return appointment;
  }
}
