import { Router } from 'express';
import { MedicController } from '../controllers/medic.controller';

export class MedicRouter {
  router: Router;

  constructor(private readonly medicController: MedicController) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .post(this.medicController.createMedic.bind(this.medicController));

    this.router
      .route('/:id')
      .get(this.medicController.getMedicById.bind(this.medicController));
  }
}
