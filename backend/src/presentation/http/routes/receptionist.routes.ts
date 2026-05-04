import { Router } from 'express';
import { ReceptionistController } from '../controllers/receptionist.controller';

export class ReceptionistRouter {
  router: Router;

  constructor(private readonly receptionistController: ReceptionistController) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .get(
        this.receptionistController.getAllReceptionists.bind(
          this.receptionistController,
        ),
      )
      .post(
        this.receptionistController.registerReceptionist.bind(
          this.receptionistController,
        ),
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
