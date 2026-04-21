import { Request, Response } from 'express';
import { ScheduleAppointmentUseCase } from '../../../core/usecases/appoitments/schedule-appointment.usecase';
import { AppointmentDTO } from '../../../core/domain/dtos/appointmet.dto';

export class AppointmentController {
  constructor(
    private readonly scheduleAppointmentUseCase: ScheduleAppointmentUseCase,
  ) {}

  async scheduleAppointment(req: Request<AppointmentDTO>, res: Response) {
    const data = req.body;

    const appointment = await this.scheduleAppointmentUseCase.execute(data);

    res.status(201).json(appointment);
  }
}
