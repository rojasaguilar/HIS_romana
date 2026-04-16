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
      .get(this.serviceController.getAllServices.bind(this.serviceController))
      .post(this.serviceController.createService.bind(this.serviceController));

    this.router
      .route('/:id')
      .get(this.serviceController.getServiceById.bind(this.serviceController));
  }
}
