import { PlanRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/plan.repository';

import { CreatePlanUseCase } from '../core/usecases/plan/create-plan.usecase';
import { UpdatePlanUseCase } from '../core/usecases/plan/update-plan.usecase';

import { PlanController } from '../presentation/http/controllers/plan.controller';
import { PlanRouter } from '../presentation/http/routes/plan.routes';
import { FindPlanByIdUseCase } from '../core/usecases/plan/get-planById.usecase';
import { FindAllPlansUseCase } from '../core/usecases/plan/getAll-plan.usecase';
import { ServiceRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/services.repository';

export const createPlanModule = () => {
  // REPOSITORY
  const planRepository = new PlanRepository();
  const serviceRepository = new ServiceRepository();

  // USE CASES
  const createPlanUseCase = new CreatePlanUseCase(
    planRepository,
    serviceRepository,
  );
  const findPlanByIdUseCase = new FindPlanByIdUseCase(planRepository);
  const findAllPlansUseCase = new FindAllPlansUseCase(planRepository);
  const updatePlanUseCase = new UpdatePlanUseCase(planRepository);

  // CONTROLLER
  const planController = new PlanController(
    createPlanUseCase,
    findPlanByIdUseCase,
    findAllPlansUseCase,
    updatePlanUseCase,
  );

  // ROUTER
  const planRouter = new PlanRouter(planController);

  return {
    router: planRouter.router,
  };
};
