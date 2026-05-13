import { Router } from 'express';
import { SubscriptionController } from '../controllers/subscription.controller';

export class SubscriptionRouter {
  router: Router;

  constructor(private readonly subscriptionController: SubscriptionController) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/')
      .get(
        this.subscriptionController.getSubscriptions.bind(
          this.subscriptionController,
        ),
      )
      .post(
        this.subscriptionController.createSubscription.bind(
          this.subscriptionController,
        ),
      );

    this.router
      .route('/:id')
      .get(
        this.subscriptionController.getSubscriptionById.bind(
          this.subscriptionController,
        ),
      )
      .patch(
        this.subscriptionController.updateSubscription.bind(
          this.subscriptionController,
        ),
      );

    this.router.get(
      '/patient/:patientId/active',
      this.subscriptionController.getActiveByPatient.bind(
        this.subscriptionController,
      ),
    );

    /*
    this.router.patch(
      '/:id/cancel',
      this.subscriptionController.cancelSubscription.bind(
        this.subscriptionController,
      ),
    );

    this.router.patch(
      '/:id/expire',
      this.subscriptionController.expireSubscription.bind(
        this.subscriptionController,
      ),
    );
    */
  }
}
