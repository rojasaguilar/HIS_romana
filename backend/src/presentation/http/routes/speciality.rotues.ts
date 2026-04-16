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
      .get(
        this.specialityController.getAllSpecialities.bind(
          this.specialityController,
        ),
      )
      .post(
        this.specialityController.createSpeciality.bind(
          this.specialityController,
        ),
      );

    this.router
      .route('/:id')
      .get(
        this.specialityController.getSpecialityById.bind(
          this.specialityController,
        ),
      );
  }
}
