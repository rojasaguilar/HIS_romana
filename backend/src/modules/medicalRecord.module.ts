import { GenerateMedicalRecordUseCase } from '../core/usecases/medicalRecord/generate-medicalRecord.usecase';
import { GetAllMedicalRecordsUseCase } from '../core/usecases/medicalRecord/getAll-medicalRecord.usecase';
import { UpdateMedicalRecordUseCase } from '../core/usecases/medicalRecord/update-medicalRecord.usecase';
import { MedicalRecordRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/medicalRecord.repository';
import { MedicalRecordController } from '../presentation/http/controllers/medicalRecord.controller';
import { MedicalRecordRouter } from '../presentation/http/routes/medicalRecord.routes';

export const createMedicalRecordModule = () => {
  const medicalRecordRepository = new MedicalRecordRepository();

  //USE CASES
  const generateMedicalRecordUseCase = new GenerateMedicalRecordUseCase(
    medicalRecordRepository,
  );
  const getAllMedicalRecordsUseCase = new GetAllMedicalRecordsUseCase(
    medicalRecordRepository,
  );

  const updateMedicalRecordUseCase = new UpdateMedicalRecordUseCase(
    medicalRecordRepository,
  );

  //CONTROLLER
  const medicalRecordController = new MedicalRecordController(
    generateMedicalRecordUseCase,
    getAllMedicalRecordsUseCase,
    updateMedicalRecordUseCase,
  );

  //ROUTER
  const medicalRecordRouter = new MedicalRecordRouter(medicalRecordController);

  return {
    router: medicalRecordRouter.router,
  };
};
