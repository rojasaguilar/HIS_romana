import { Request, Response } from 'express';
import { ScheduleAppointmentUseCase } from '../../../core/usecases/appoitments/schedule-appointment.usecase';
import {
  AppointmentDTO,
  RescheduleAppointmentDTO,
} from '../../../core/domain/dtos/appointmet.dto';
import { RescheduleAppointmentUseCase } from '../../../core/usecases/appoitments/reschedule-appointment.usecase';
import { GetAllAppointmentsUseCase } from '../../../core/usecases/appoitments/getAll-appointment.usecase';
import { FilterAppoinmentsUseCase } from '../../../core/usecases/appoitments/filter-appointments.usecase';
import { buildAppointmentFilter } from '../helpers/build-filterAppointment';

export class AppointmentController {
  constructor(
    private readonly scheduleAppointmentUseCase: ScheduleAppointmentUseCase,
    private readonly rescheduleAppointmentUseCase: RescheduleAppointmentUseCase,
    private readonly getAllAppointemtsUseCase: GetAllAppointmentsUseCase,
    private readonly filterAppointmentsUseCase: FilterAppoinmentsUseCase,
  ) {}

  async getAllAppointments(req: Request, res: Response) {
    let appointments;

    if (!req.query) {
      appointments = await this.getAllAppointemtsUseCase.execute();
    } else {
      const filterObject = buildAppointmentFilter(req.query);

      console.log('filter', filterObject);
      appointments = await this.filterAppointmentsUseCase.execute(filterObject);
    }

    res.status(200).json({
      count: appointments.length,
      appointments,
    });
  }

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
