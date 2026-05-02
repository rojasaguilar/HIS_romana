import { GenerateMedicalRecordUseCase } from '../core/usecases/medicalRecord/generate-medicalRecord.usecase';
import { MedicalRecordRepository } from '../infraestructure/dataproviders/mongodb-dataprovider/repositories/medicalRecord.repository';
import { MedicalRecordController } from '../presentation/http/controllers/medicalRecord.controller';
import { MedicalRecordRouter } from '../presentation/http/routes/medicalRecord.routes';

export const createMedicalRecordModule = () => {
  const medicalRecordRepository = new MedicalRecordRepository();

  const generateMedicalRecordUseCase = new GenerateMedicalRecordUseCase(
    medicalRecordRepository,
  );

  const medicalRecordController = new MedicalRecordController(
    generateMedicalRecordUseCase,
  );

  const medicalRecordRouter = new MedicalRecordRouter(medicalRecordController);

  return {
    router: medicalRecordRouter.router,
  };
};
