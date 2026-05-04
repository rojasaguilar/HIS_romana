import { Router } from 'express';
import { SystemAccountController } from '../controllers/systemAccountController';

export class AuthRouter {
  router: Router;

  constructor(
    private readonly systemAccountController: SystemAccountController,
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/login')
      //   .get(this.AppointmentController.getMedics.bind(this.AppointmentController))
      .post(
        this.systemAccountController.login.bind(this.systemAccountController),
      );

    // this.router
    //   .route('/:id/reschedule')
    //   .patch(
    //     this.AppointmentController.rescheduleAppointment.bind(
    //       this.AppointmentController,
    //     ),
    //   );
    //   .get(this.AppointmentController.getMedicById.bind(this.AppointmentController));
  }
}
