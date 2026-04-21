import { AppointmentEntity } from '../../../../core/domain/entities/appointment.entity';
import { IAppointmentRepository } from '../../../../core/domain/repositories/appointment.repository.interface';
import { AppointmentMapper } from '../mappers/appointment.mapper';
import appointmentModel from '../models/appointment.model';

export class AppointmentRepository implements IAppointmentRepository {
  async save(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    const appointmentData = AppointmentMapper.toPersistance(appointment);

    const savedAppointment = await appointmentModel.create(appointmentData);

    
  }
  findById(id: string): Promise<AppointmentEntity | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<AppointmentEntity[]> {
    throw new Error('Method not implemented.');
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

    if (appointmentExists) return true;

    return false;
  }
}
