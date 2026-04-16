import { GetAllSpecialitiesUseCase } from '../core/usecases/services/getAll-specialities.usecase';
import { GetSpecialityByIdUseCase } from '../core/usecases/speciality/get-speciality.usecase';
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
  const getAllSpecialitiesUseCase = new GetAllSpecialitiesUseCase(
    specialityRepository,
  );
  const getSpecialityByIdUseCase = new GetSpecialityByIdUseCase(
    specialityRepository,
  );

  const specialityController = new SpecialityController(
    registerSpecialityUseCase,
    getAllSpecialitiesUseCase,
    getSpecialityByIdUseCase,
  );

  const specialityRouter = new SpecialityRoutes(specialityController);

  return {
    router: specialityRouter.router,
  };
};
