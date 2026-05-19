import { GetAllSpecialitiesUseCase } from '../core/usecases/speciality/getAll-specialities.usecase';
import { GetSpecialityByIdUseCase } from '../core/usecases/speciality/get-speciality.usecase';
import { RegisterSpecialityUseCase } from '../core/usecases/speciality/register-speciality.usecase';
import { SpecialityRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/speciality.repository';
import { SpecialityController } from '../presentation/http/controllers/speciality.controller';
import { SpecialityRoutes } from '../presentation/http/routes/speciality.rotues';
import { UpdateSpecialityUseCase } from '../core/usecases/speciality/update-speciality.usecase';

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
  const updateSpecialityUseCase = new UpdateSpecialityUseCase(
    specialityRepository,
  );

  const specialityController = new SpecialityController(
    registerSpecialityUseCase,
    getAllSpecialitiesUseCase,
    getSpecialityByIdUseCase,
    updateSpecialityUseCase,
  );

  const specialityRouter = new SpecialityRoutes(specialityController);

  return {
    router: specialityRouter.router,
  };
};
