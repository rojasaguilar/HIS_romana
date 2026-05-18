import { GetMedicPatientsUseCase } from '../../core/usecases/patients/get-medic-patients.usecase';
import { GetPatientUseCase } from '../../core/usecases/patients/get-patient.usecase';
import { RegisterPatientUseCase } from '../../core/usecases/patients/register-patient.usecase';
import { AppointmentRepository } from '../../infraestructure/dataproviders/mongodb-dataprovider/repositories/appointment.repository';
import PatientRepository from '../../infraestructure/dataproviders/mongodb-dataprovider/repositories/patient.repository';
import { JWTTokenService } from '../../infraestructure/services/JWT.token.service';
import { PatientController } from '../../presentation/http/controllers/patient.controller';
import { AuthMiddleware } from '../../presentation/http/middlewares/protect-route';
import { PatientRouter } from '../../presentation/http/routes/patient.routes';

export const createPatientModule = () => {
  const patientRepository = new PatientRepository();
  const appointmentRepository = new AppointmentRepository();

  const registerPatientUseCase = new RegisterPatientUseCase(patientRepository);
  const getPatientUseCase = new GetPatientUseCase(patientRepository);

  const getMedicPatientsUseCase = new GetMedicPatientsUseCase(
    patientRepository,
    appointmentRepository,
  );

  const jwtTokenService = new JWTTokenService();
  const authMiddleware = AuthMiddleware(jwtTokenService);

  const patientController = new PatientController(
    registerPatientUseCase,
    getPatientUseCase,
    getMedicPatientsUseCase,
  );

  const patientRouter = new PatientRouter(patientController, authMiddleware);

  return {
    router: patientRouter.router,
  };
};
