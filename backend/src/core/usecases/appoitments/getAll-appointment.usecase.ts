import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';

export class GetAllAppointmentsUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute() {
    return await this.appointmentRepository.getAll();
  }
}
