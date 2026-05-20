import { Request, Response } from 'express';
import { RegisterPatientUseCase } from '../../../core/usecases/patients/register-patient.usecase';
import { GetPatientUseCase } from '../../../core/usecases/patients/get-patient.usecase';
import { asyncHandler } from '../middlewares/asyncHandler';
import { GetMedicPatientsUseCase } from '../../../core/usecases/patients/get-medic-patients.usecase';
// import PatientEntity from '../../../core/domain/entities/patient.entity';
import { RegisterPatientDTO } from '../../../core/domain/dtos/patient.dto';
import { UpdatePatientUseCase } from '../../../core/usecases/patients/update-patient.usecase';
// import PatientEntity just to know if my useCase returns that type

export class PatientController {
  constructor(
    private registerPatient: RegisterPatientUseCase,
    private getPatient: GetPatientUseCase,
    private getMedicPatientsUseCase: GetMedicPatientsUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase,
  ) {}

  async createPatient(req: Request, res: Response) {
    const registeredPatient = await this.registerPatient.execute(req.body);

    res.status(201).json(registeredPatient);
  }

  async getPatientById(req: Request<{ id: string }>, res: Response) {
    let { id } = req.params;

    const patient = await this.getPatient.findById(id);

    // console.log(patient instanceof PatientEntity);

    console.log(patient?.isUniversalDonator());

    res.status(200).json(patient);
  }

  getPatients = asyncHandler(async (req: Request, res: Response) => {
    let patients;

    if (req.user?.roles?.includes('MEDIC')) {
      patients = await this.getMedicPatientsUseCase.execute(req.user.userId);
    } else {
      patients = await this.getPatient.getAll();
    }

    res.status(200).json(patients);
  });

  updatePatient = asyncHandler(
    async (
      req: Request<{ id: string }, any, RegisterPatientDTO>,
      res: Response,
    ) => {
      const { id } = req.params;
      const data = req.body;
      const updatedPatient = await this.updatePatientUseCase.execute(id, data);

      res.status(200).json(updatedPatient);
    },
  );
}
