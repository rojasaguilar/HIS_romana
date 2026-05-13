// createSubscriptionModule.ts

import { SubscriptionRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/subscription.repository';

import { CreateSubscriptionUseCase } from '../core/usecases/subscription/create-subscription.usecase';
import { FindSubscriptionByIdUseCase } from '../core/usecases/subscription/find-subscription-by-id.usecase';
import { FindAllSubscriptionsUseCase } from '../core/usecases/subscription/find-all-subscriptions.usecase';
import { UpdateSubscriptionUseCase } from '../core/usecases/subscription/update-subscription.usecase';

import { SubscriptionController } from '../presentation/http/controllers/subscription.controller';
import { SubscriptionRouter } from '../presentation/http/routes/subscription.routes';
import { ServiceRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/services.repository';
import { PlanRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/plan.repository';
import { GetActiveSubscriptionByPatientUseCase } from '../core/usecases/appoitments/get-active-subscription-by-patient.usecase';

export const createSubscriptionModule = () => {
  // REPOSITORIES
  const subscriptionRepository = new SubscriptionRepository();
  const serviceRepository = new ServiceRepository();
  const planRepository = new PlanRepository();

  // USE CASES
  const createSubscriptionUseCase = new CreateSubscriptionUseCase(
    subscriptionRepository,
    serviceRepository,
    planRepository,
  );

  const findSubscriptionByIdUseCase = new FindSubscriptionByIdUseCase(
    subscriptionRepository,
  );

  const findAllSubscriptionsUseCase = new FindAllSubscriptionsUseCase(
    subscriptionRepository,
  );

  const updateSubscriptionUseCase = new UpdateSubscriptionUseCase(
    subscriptionRepository,
    serviceRepository,
  );

  const getActiveSubscriptionByPatientUseCase =
    new GetActiveSubscriptionByPatientUseCase(
      subscriptionRepository,
      serviceRepository,
    );

  // CONTROLLER
  const subscriptionController = new SubscriptionController(
    createSubscriptionUseCase,
    findSubscriptionByIdUseCase,
    findAllSubscriptionsUseCase,
    updateSubscriptionUseCase,
    getActiveSubscriptionByPatientUseCase
  );

  // ROUTER
  const subscriptionRouter = new SubscriptionRouter(subscriptionController);

  return {
    router: subscriptionRouter.router,
  };
};
