import { AuthService } from '../core/domain/domain-services/auth.service';
import { RegisterRecepcionistUseCase } from '../core/usecases/recepcionist/register-recepcionist.usecase';
import { ReceptionistRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/receptionist.repository';
import { SystemAccountRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/systemAccount.repository';
import { BcryptPasswordService } from '../infraestructure/services/BcryptPasswordService';
import { JWTTokenService } from '../infraestructure/services/JWT.token.service';
import { ReceptionistController } from '../presentation/http/controllers/receptionist.controller';
import { ReceptionistRouter } from '../presentation/http/routes/receptionist.routes';

export const createreceptionistModule = () => {
  const receptionistRepository = new ReceptionistRepository();
  const systemAccountRepository = new SystemAccountRepository();

  const tokenService = new JWTTokenService();
  const authService = new AuthService(tokenService);
  const passwordService = new BcryptPasswordService();

  //USE CASES
  const registerReceptionistUseCase = new RegisterRecepcionistUseCase(
    receptionistRepository,
    authService,
    systemAccountRepository,
    passwordService,
  );
  //   const getAllreceptionistsUseCase = new GetAllreceptionistsUseCase(
  //     receptionistRepository,
  //   );

  //CONTROLLER
  const receptionistController = new ReceptionistController(
    registerReceptionistUseCase,
  );

  //ROUTER
  const receptionistRouter = new ReceptionistRouter(receptionistController);

  return {
    router: receptionistRouter.router,
  };
};
