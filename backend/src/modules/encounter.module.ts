import { EncounterRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/encounter.repository';
import { CreateEncounterUseCase } from '../core/usecases/encounters/create-encounter.usecase';
import { GetEncounterByAppointmentUseCase } from '../core/usecases/encounters/getEncounterByAppointment-usecse';
import { GetPatientEncountersUseCase } from '../core/usecases/encounters/getPatient-encounters.usecase';
import { EncounterController } from '../presentation/http/controllers/encounter.controller';
import { EncounterRouter } from '../presentation/http/routes/encounter.routes';
import { JWTTokenService } from '../infraestructure/services/JWT.token.service';
import { AuthMiddleware } from '../presentation/http/middlewares/protect-route';
import PatientRepository from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/patient.repository';
import { MedicRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/medic.repository';
import { AppointmentRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/appointment.repository';
import { LabTestRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/lab-test.respository';

export const createEncounterModule = () => {
  const jwtTokenService = new JWTTokenService();
  // REPOSITORY
  const encounterRepository = new EncounterRepository();
  const authMiddleware = AuthMiddleware(jwtTokenService);
  const patientRepostory = new PatientRepository();
  const medicRepository = new MedicRepository();
  const appointmentRepository = new AppointmentRepository();
  const labTestRepository = new LabTestRepository();
  // const serviceRepository = new ServiceRepository();

  // USE CASES
  const createEncounterUseCase = new CreateEncounterUseCase(
    encounterRepository, // serviceRepository,
    appointmentRepository,
    patientRepostory,
    medicRepository,
    labTestRepository,
  );

  const getEncounterByAppointmentUseCase = new GetEncounterByAppointmentUseCase(
    encounterRepository,
  );

  const getPatientEncountersUseCase = new GetPatientEncountersUseCase(
    encounterRepository,
  );

  // CONTROLLER
  const encounterController = new EncounterController(
    createEncounterUseCase,
    getPatientEncountersUseCase,
    getEncounterByAppointmentUseCase,
  );

  // ROUTER
  const encounterRouter = new EncounterRouter(
    encounterController,
    authMiddleware,
  );

  return {
    router: encounterRouter.router,
  };
};
