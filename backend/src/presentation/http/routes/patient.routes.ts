import { RequestHandler, Router } from 'express';
import { PatientController } from '../controllers/patient.controller';

export class PatientRouter {
  public router: Router;

  constructor(
    private readonly patientController: PatientController,
    private readonly authMiddleware: RequestHandler,
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .post(this.patientController.createPatient.bind(this.patientController))
      .get(
        this.authMiddleware,
        this.patientController.getPatients.bind(this.patientController),
      );

    this.router
      .route('/:id')
      .get(this.patientController.getPatientById.bind(this.patientController));
  }
}
