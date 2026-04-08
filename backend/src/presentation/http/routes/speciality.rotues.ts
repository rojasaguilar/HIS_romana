import { Router } from 'express';
import { SpecialityController } from '../controllers/speciality.controller';

export class SpecialityRoutes {
  public router: Router;
  constructor(public readonly specialityController: SpecialityController) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .post(
        this.specialityController.createSpeciality.bind(
          this.specialityController,
        ),
      );
  }
}
