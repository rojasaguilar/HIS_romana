import { GetPatientUseCase } from '../../core/usecases/patients/get-patient.usecase';
import { RegisterPatientUseCase } from '../../core/usecases/patients/register-patient.usecase';
import PatientRepository from '../../infraestructure/dataproviders/mongodb-dataprovider/repositories/patient.repository';
import {PatientController} from '../../presentation/http/controllers/patient.controller';
import { PatientRouter } from '../../presentation/http/routes/patient.routes';

export const createPatientModule = () => {
  const patientRepository = new PatientRepository();

  const registerPatientUseCase = new RegisterPatientUseCase(patientRepository);
  const getPatientUseCase = new GetPatientUseCase(patientRepository);

  const patientController = new PatientController(
    registerPatientUseCase,
    getPatientUseCase,
  );

  const patientRouter = new PatientRouter(patientController);

  return {
    router: patientRouter.router,
  };
};
