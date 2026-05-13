import { GetMedicUseCase } from '../core/usecases/medic/get-medic.usecase';
import { GetAllMedicsUseCase } from '../core/usecases/medic/getAll-medics.usecase';
import { RegisterMedicUseCase } from '../core/usecases/medic/register-medic.usecase';
import { MongooseTransactionManager } from '../infraestructure/dataproviders/mongodb-dataprovider/mongoose-transaction.manager';
import { MedicRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/medic.repository';
import { SpecialityRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/speciality.repository';
import { SystemAccountRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/systemAccount.repository';
import { BcryptPasswordService } from '../infraestructure/services/BcryptPasswordService';
import { MedicController } from '../presentation/http/controllers/medic.controller';
import { MedicRouter } from '../presentation/http/routes/medic.routes';

export const createMedicModule = () => {
  const medicRepository = new MedicRepository();
  const specialityRepory = new SpecialityRepository();
  const transactionManager = new MongooseTransactionManager();
  const passwordService = new BcryptPasswordService();
  const systemAccountRepository = new SystemAccountRepository();

  //USE CASES
  const registerMedicUseCase = new RegisterMedicUseCase(
    medicRepository,
    specialityRepory,
    systemAccountRepository,
    passwordService,
    transactionManager,
  );
  const getMedicUseCase = new GetMedicUseCase(medicRepository);

  const getAllMedicsUseCase = new GetAllMedicsUseCase(medicRepository);

  const medicController = new MedicController(
    registerMedicUseCase,
    getMedicUseCase,
    getAllMedicsUseCase,
  );

  const medicRouter = new MedicRouter(medicController);

  return {
    router: medicRouter.router,
  };
};
