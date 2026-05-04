import {
  FilterAppointmentDTO,
  RescheduleAppointmentDTO,
} from '../../../../core/domain/dtos/appointmet.dto';
import { AppointmentEntity } from '../../../../core/domain/entities/appointment.entity';
import { IAppointmentRepository } from '../../../../core/domain/repositories/appointment.repository.interface';
import { AppointmentMapper } from '../mappers/appointment.mapper';
import appointmentModel from '../models/appointment.model';

export class AppointmentRepository implements IAppointmentRepository {
  async filter(
    filterObject: Partial<FilterAppointmentDTO>,
  ): Promise<AppointmentEntity[]> {
    const appointmentDocs = await appointmentModel.find(filterObject);

    return appointmentDocs.map((app) => AppointmentMapper.toDomain(app));
  }
  async save(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    const appointmentData = AppointmentMapper.toPersistance(appointment);

    const savedAppointment = await appointmentModel.create(appointmentData);

    return AppointmentMapper.toDomain(savedAppointment);
  }

  async findById(id: string): Promise<AppointmentEntity | null> {
    const appointmentDoc = await appointmentModel.findById(id);

    if (!appointmentDoc) return null;

    return AppointmentMapper.toDomain(appointmentDoc);
  }

  async getAll(): Promise<AppointmentEntity[]> {
    const appointmentDocs = await appointmentModel.find();

    return appointmentDocs.map((app) => AppointmentMapper.toDomain(app));
  }

  async overlaps(
    patientId: string,
    medicId: string,
    newStartDate: Date,
    newEndTime: Date,
  ): Promise<boolean> {
    const appointmentExists = await appointmentModel.find({
      $or: [{ medicId: medicId }, { patientId: patientId }],
      startDate: { $lt: newEndTime },
      endTime: { $gt: newStartDate },
    });

    if (appointmentExists.length > 0) return true;

    return false;
  }

  async update(
    id: string,
    data: RescheduleAppointmentDTO,
  ): Promise<AppointmentEntity | null> {
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );

    if (!updatedAppointment) return null;

    return AppointmentMapper.toDomain(updatedAppointment);
  }
}
