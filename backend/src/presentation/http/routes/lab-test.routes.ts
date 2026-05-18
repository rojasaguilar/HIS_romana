import { RequestHandler, Router } from 'express';
import { LabTestController } from '../controllers/lab-test.controller';

export class LabTestRouter {
  public router: Router;

  constructor(
    private readonly labTestController: LabTestController,
    private readonly authMiddleware: RequestHandler,
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.route('/').post(
      // this.authMiddleware,
      this.labTestController.createLabTest.bind(this.labTestController),
    );

    this.router.route('/:id').get(
      // this.authMiddleware,
      this.labTestController.getLabTestById.bind(this.labTestController),
    );

    this.router.route('/:id/complete').patch(
      // this.authMiddleware,
      this.labTestController.completeLabTest.bind(this.labTestController),
    );

    this.router.route('/patient/:patientId').get(
      // this.authMiddleware,
      this.labTestController.getPatientLabTests.bind(this.labTestController),
    );

    // // Obtener solo los estudios pendientes de un paciente
    // this.router.route('/patient/:patientId/pending').get(
    //   // this.authMiddleware,
    //   this.labTestController.getPendingLabTests.bind(this.labTestController),
    // );

    // Obtener los estudios ordenados en una cita médica específica
    this.router.route('/encounter/:encounterId').get(
      // this.authMiddleware,
      this.labTestController.getEncounterLabTests.bind(this.labTestController),
    );
  }
}
