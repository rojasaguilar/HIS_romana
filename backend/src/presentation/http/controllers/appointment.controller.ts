import { Request, Response } from 'express';
import { ScheduleAppointmentUseCase } from '../../../core/usecases/appoitments/schedule-appointment.usecase';
import {
  AppointmentDTO,
  RescheduleAppointmentDTO,
} from '../../../core/domain/dtos/appointmet.dto';
import { RescheduleAppointmentUseCase } from '../../../core/usecases/appoitments/reschedule-appointment.usecase';

export class AppointmentController {
  constructor(
    private readonly scheduleAppointmentUseCase: ScheduleAppointmentUseCase,
    private readonly rescheduleAppointmentUseCase: RescheduleAppointmentUseCase,
  ) {}

  async scheduleAppointment(req: Request<AppointmentDTO>, res: Response) {
    const data = req.body;

    const appointment = await this.scheduleAppointmentUseCase.execute(data);

    res.status(201).json(appointment);
  }

  async rescheduleAppointment(
    req: Request<{ id: string }, any, RescheduleAppointmentDTO>,
    res: Response,
  ) {
    const appointmentId = req.params.id;
    const newStartDateString = req.body.startDate;

    const newStartDate = new Date(newStartDateString);

    const appointment = await this.rescheduleAppointmentUseCase.execute(
      appointmentId,
      newStartDate,
    );

    res.status(201).json(appointment);
  }
}
