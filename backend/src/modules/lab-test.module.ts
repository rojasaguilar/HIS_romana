import { ILabTestRepository } from '../core/domain/repositories/lab-test.respository.interface';
import { LabTestRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/lab-test.respository';
import { LabTestController } from '../presentation/http/controllers/lab-test.controller';
import { CompleteLabTestUseCase } from '../core/usecases/lab-test/complete-lab-test.usecase';
import { CreateLabTestUseCase } from '../core/usecases/lab-test/create-lab-test.usecase';
import { GetLabTestByIdUseCase } from '../core/usecases/lab-test/get-lab-testById.usecase';
import { GetPatientLabTestsUseCase } from '../core/usecases/lab-test/get-patient-lab-test.usecase';
import { LabTestRouter } from '../presentation/http/routes/lab-test.routes';
import { AuthMiddleware } from '../presentation/http/middlewares/protect-route';
import { JWTTokenService } from '../infraestructure/services/JWT.token.service';
import { GetEncounterLabTestsUseCase } from '../core/usecases/lab-test/get-encounter-lab-tests.usecase';

export const createLabTestModule = () => {
  const labTestRepository: ILabTestRepository = new LabTestRepository();

  //USECASES
  const createLabTestUseCase = new CreateLabTestUseCase(labTestRepository);
  const completeLabTestUseCase = new CompleteLabTestUseCase(labTestRepository);
  const getLabTestByIdUseCase = new GetLabTestByIdUseCase(labTestRepository);
  const getPatientLabTestUseCase = new GetPatientLabTestsUseCase(
    labTestRepository,
  );
  const getEncounterLabTestsUseCase = new GetEncounterLabTestsUseCase(
    labTestRepository,
  );

  //CONTROLLER
  const labTestController = new LabTestController(
    createLabTestUseCase,
    completeLabTestUseCase,
    getLabTestByIdUseCase,
    getPatientLabTestUseCase,
    getEncounterLabTestsUseCase,
  );

  const jwtTokenService = new JWTTokenService();
  const authMiddleware = AuthMiddleware(jwtTokenService);

  const labTestRouter = new LabTestRouter(labTestController, authMiddleware);
  return {
    router: labTestRouter.router,
  };
};
