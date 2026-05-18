import { RequestHandler, Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';

export class AppointmentRouter {
  router: Router;

  constructor(
    private readonly AppointmentController: AppointmentController,
    private readonly authMiddleware: RequestHandler,
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .get(
        this.authMiddleware,
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
      .route('/:id')
      .get(
        this.AppointmentController.getAppointment.bind(
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

    this.router.patch(
      '/:id/complete',
      this.AppointmentController.completeAppointment.bind(
        this.AppointmentController,
      ),
    );
    //   .get(this.AppointmentController.getMedicById.bind(this.AppointmentController));
  }
}
