import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';

export class AppointmentRouter {
  router: Router;

  constructor(private readonly AppointmentController: AppointmentController) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .get(
        this.AppointmentController.getAllAppointments.bind(
          this.AppointmentController,
        ),
      )
      .post(
        this.AppointmentController.scheduleAppointment.bind(
          this.AppointmentController,
        ),
      );

    this.router
      .route('/:id/reschedule')
      .patch(
        this.AppointmentController.rescheduleAppointment.bind(
          this.AppointmentController,
        ),
      );
    //   .get(this.AppointmentController.getMedicById.bind(this.AppointmentController));
  }
}
