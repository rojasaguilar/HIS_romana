import { AppointmentEntity } from '../entities/appointment.entity';

export interface IAppointmentRepository {
  save(appointment: AppointmentEntity): Promise<AppointmentEntity>;

  findById(id: string): Promise<AppointmentEntity | null>;

  getAll(): Promise<AppointmentEntity[]>;

  overlaps(medicId: string, startDate: Date, duration: Number): boolean;
}
