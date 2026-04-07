import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';

export class ServiceRoutes {
  public router: Router;

  constructor(private readonly serviceController: ServiceController) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .post(this.serviceController.createService.bind(this.serviceController));
  }
}
