import { RegisterSpecialityUseCase } from '../core/usecases/speciality/register-speciality.usecase';
import { SpecialityRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/speciality.repository';
import { SpecialityController } from '../presentation/http/controllers/speciality.controller';
import { SpecialityRoutes } from '../presentation/http/routes/speciality.rotues';

export const createSpecialityModule = () => {
  const specialityRepository = new SpecialityRepository();

  //USE CASES
  const registerSpecialityUseCase = new RegisterSpecialityUseCase(
    specialityRepository,
  );

  const specialityController = new SpecialityController(
    registerSpecialityUseCase,
  );

  const specialityRouter = new SpecialityRoutes(specialityController);

  return {
    router: specialityRouter.router,
  };
};
