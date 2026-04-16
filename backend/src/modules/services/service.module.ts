import { GetServiceByIdUseCase } from '../../core/usecases/services/get-serviceById.usecase';
import { GetServicesUseCase } from '../../core/usecases/services/get-services.usecase';
import { RegisterServiceUseCase } from '../../core/usecases/services/register-service.usecase';
import { ServiceRepository } from '../../infraestructure/dataproviders/mongodb-dataprovider/repositories/services.repository';
import { SpecialityRepository } from '../../infraestructure/dataproviders/mongodb-dataprovider/repositories/speciality.repository';
import { ServiceController } from '../../presentation/http/controllers/service.controller';
import { ServiceRoutes } from '../../presentation/http/routes/service.routes';

export const createServiceModule = () => {
  const serviceRepository = new ServiceRepository();
  const specialityRepository = new SpecialityRepository();

  const registerServiceUseCase = new RegisterServiceUseCase(
    serviceRepository,
    specialityRepository,
  );
  const getServicesUseCase = new GetServicesUseCase(serviceRepository);
  const getServiceByIdUseCase = new GetServiceByIdUseCase(serviceRepository);

  const serviceController = new ServiceController(
    registerServiceUseCase,
    getServicesUseCase,
    getServiceByIdUseCase,
  );

  const serviceRouter = new ServiceRoutes(serviceController);

  return {
    router: serviceRouter.router,
  };
};
