import { AuthService } from '../core/domain/domain-services/auth.service';
import { LoginUseCase } from '../core/usecases/systemAccount/login.usecase';
import { SystemAccountRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/systemAccount.repository';
import { BcryptPasswordService } from '../infraestructure/services/BcryptPasswordService';
import { JWTTokenService } from '../infraestructure/services/JWT.token.service';
import { SystemAccountController } from '../presentation/http/controllers/systemAccountController';
import { AuthRouter } from '../presentation/http/routes/auth.routes';

export const createAuthModule = () => {
  //REPOSITORIES
  const systemAccountRepository = new SystemAccountRepository();

  //SERVICES
  const passwordService = new BcryptPasswordService();
  const tokenService = new JWTTokenService();
  const authService = new AuthService(tokenService);

  //USE CASES
  const loginUseCase = new LoginUseCase(
    passwordService,
    systemAccountRepository,
    authService,
  );

  //CONTROLLER
  const systemAccountController = new SystemAccountController(loginUseCase);

  const authRouter = new AuthRouter(systemAccountController);

  return {
    router: authRouter.router,
  };
};
