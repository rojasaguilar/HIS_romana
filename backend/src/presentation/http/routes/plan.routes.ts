import { Router } from 'express';
import { PlanController } from '../controllers/plan.controller';

export class PlanRouter {
  router: Router;

  constructor(private readonly planController: PlanController) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .get(this.planController.getPlans.bind(this.planController))
      .post(this.planController.createPlan.bind(this.planController));

    // 🔧 get by id + update
    this.router
      .route('/:id')
      .get(this.planController.getPlanById.bind(this.planController))
      .patch(this.planController.updatePlan.bind(this.planController));

    /*
    this.router.patch(
      '/:id/activate',
      this.planController.activatePlan.bind(this.planController)
    );

    this.router.patch(
      '/:id/deactivate',
      this.planController.deactivatePlan.bind(this.planController)
    );
    */
  }
}
