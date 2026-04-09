import { GetMedicUseCase } from '../core/usecases/medic/get-medic.usecase';
import { RegisterMedicUseCase } from '../core/usecases/medic/register-medic.usecase';
import { MedicRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/medic.repository';
import { SpecialityRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/speciality.repository';
import { MedicController } from '../presentation/http/controllers/medic.controller';
import { MedicRouter } from '../presentation/http/routes/medic.routes';

export const createMedicModule = () => {
  const medicRepository = new MedicRepository();
  const specialityRepory = new SpecialityRepository();

  //USE CASES
  const registerMedicUseCase = new RegisterMedicUseCase(
    medicRepository,
    specialityRepory,
  );
  const getMedicUseCase = new GetMedicUseCase(medicRepository);

  const medicController = new MedicController(
    registerMedicUseCase,
    getMedicUseCase,
  );

  const medicRouter = new MedicRouter(medicController);

  return {
    router: medicRouter.router,
  };
};
