import { AuthService } from '../core/domain/domain-services/auth.service';
import { RegisterRecepcionistUseCase } from '../core/usecases/recepcionist/register-recepcionist.usecase';
import { ReceptionistRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/receptionist.repository';
import { SystemAccountRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/systemAccount.repository';
import { BcryptPasswordService } from '../infraestructure/services/BcryptPasswordService';
import { JWTTokenService } from '../infraestructure/services/JWT.token.service';
import { ReceptionistController } from '../presentation/http/controllers/receptionist.controller';
import { ReceptionistRouter } from '../presentation/http/routes/receptionist.routes';
import { GetAllReceptionistUseCase } from '../core/usecases/recepcionist/getAll-receptionist.usecase';
import { MongooseTransactionManager } from '../infraestructure/dataproviders/mongodb-dataprovider/mongoose-transaction.manager';
import { GetReceptionistByIdUseCase } from '../core/usecases/recepcionist/getReceptionist.usecase';

export const createreceptionistModule = () => {
  const receptionistRepository = new ReceptionistRepository();
  const systemAccountRepository = new SystemAccountRepository();

  const tokenService = new JWTTokenService();
  const authService = new AuthService(tokenService);
  const passwordService = new BcryptPasswordService();
  const transactionManager = new MongooseTransactionManager();

  //USE CASES
  const registerReceptionistUseCase = new RegisterRecepcionistUseCase(
    receptionistRepository,
    authService,
    systemAccountRepository,
    passwordService,
    transactionManager,
  );
  const getAllreceptionistsUseCase = new GetAllReceptionistUseCase(
    receptionistRepository,
  );

  const getReceptionistByIdUseCase = new GetReceptionistByIdUseCase(
    receptionistRepository,
  );

  //CONTROLLER
  const receptionistController = new ReceptionistController(
    registerReceptionistUseCase,
    getAllreceptionistsUseCase,
    getReceptionistByIdUseCase,
  );

  //ROUTER
  const receptionistRouter = new ReceptionistRouter(receptionistController);

  return {
    router: receptionistRouter.router,
  };
};
