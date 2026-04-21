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
      //   .get(this.AppointmentController.getMedics.bind(this.AppointmentController))
      .post(
        this.AppointmentController.scheduleAppointment.bind(
          this.AppointmentController,
        ),
      );

    // this.router
    //   .route('/:id')
    //   .get(this.AppointmentController.getMedicById.bind(this.AppointmentController));
  }
}
