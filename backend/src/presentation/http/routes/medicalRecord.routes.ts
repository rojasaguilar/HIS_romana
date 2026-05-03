import { Router } from 'express';
import { MedicalRecordController } from '../controllers/medicalRecord.controller';
export class MedicalRecordRouter {
  router: Router;
  constructor(private readonly medRecController: MedicalRecordController) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .get(
        this.medRecController.getAllMedicalRecords.bind(this.medRecController),
      )
      .post(
        this.medRecController.generateMedicalRecord.bind(this.medRecController),
      );
  }
}
