import { FilterAppointmentDTO } from '../../domain/dtos/appointmet.dto';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';

export class FilterAppoinmentsUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(filterObject: Partial<FilterAppointmentDTO>) {
    return await this.appointmentRepository.filter(filterObject);
  }
}
