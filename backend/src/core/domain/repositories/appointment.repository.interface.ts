import { ClientSession } from 'mongoose';
import {
  FilterAppointmentDTO,
  UpdateAppointmentDTO,
} from '../dtos/appointmet.dto';
import { AppointmentEntity } from '../entities/appointment.entity';

export interface IAppointmentRepository {
  save(
    appointment: AppointmentEntity,
    session?: ClientSession,
  ): Promise<AppointmentEntity>;

  findById(id: string): Promise<AppointmentEntity | null>;

  filter(
    filterObject: Partial<FilterAppointmentDTO>,
  ): Promise<AppointmentEntity[]>;

  getAll(): Promise<AppointmentEntity[]>;

  overlaps(
    patientId: string,
    medicId: string,
    startDate: Date,
    endTime: Date,
    session?:ClientSession
  ): Promise<boolean>;

  update(
    id: string,
    data: UpdateAppointmentDTO,
  ): Promise<AppointmentEntity | null>;
}
