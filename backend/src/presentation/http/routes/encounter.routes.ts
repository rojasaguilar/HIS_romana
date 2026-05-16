import { RequestHandler, Router } from 'express';
import { EncounterController } from '../controllers/encounter.controller';
export class EncounterRouter {
  public router: Router;

  constructor(
    private readonly encounterController: EncounterController,
    private readonly authMiddleware: RequestHandler,
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .post(
        // this.authMiddleware,
        this.encounterController.createEncounter.bind(this.encounterController),
      );

    this.router
      .route('/patient/:patientId')
      .get(
        this.encounterController.getPatientEncounters.bind(
          this.encounterController,
        ),
      );

    this.router
      .route('/appointment/:appointmentId')
      .get(
        this.encounterController.getEncounterByAppointment.bind(
          this.encounterController,
        ),
      );
  }
}
