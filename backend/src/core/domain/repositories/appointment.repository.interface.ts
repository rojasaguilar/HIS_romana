import { UpdateAppointmentDTO } from '../dtos/appointmet.dto';
import { AppointmentEntity } from '../entities/appointment.entity';

export interface IAppointmentRepository {
  save(appointment: AppointmentEntity): Promise<AppointmentEntity>;

  findById(id: string): Promise<AppointmentEntity | null>;

  getAll(): Promise<AppointmentEntity[]>;

  overlaps(
    patientId: string,
    medicId: string,
    startDate: Date,
    endTime: Date,
  ): Promise<boolean>;

  update(
    id: string,
    data: UpdateAppointmentDTO,
  ): Promise<AppointmentEntity | null>;
}
