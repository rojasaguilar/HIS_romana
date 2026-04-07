import { RegisterServiceUseCase } from '../../core/usecases/services/register-service.usecase';
import { ServiceRepository } from '../../infraestructure/dataproviders/mongodb-dataprovider/repositories/services.repository';
import { ServiceController } from '../../presentation/http/controllers/service.controller';
import { ServiceRoutes } from '../../presentation/http/routes/service.routes';

export const createServiceModule = () => {
  const serviceRepository = new ServiceRepository();

  const registerServiceUseCase = new RegisterServiceUseCase(serviceRepository);

  const serviceController = new ServiceController(registerServiceUseCase);

  const serviceRouter = new ServiceRoutes(serviceController);

  return {
    router: serviceRouter.router,
  };
};
