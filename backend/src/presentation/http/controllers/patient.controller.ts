import { Request, Response } from 'express';
import { RegisterPatientUseCase } from '../../../core/usecases/patients/register-patient.usecase';
import { GetPatientUseCase } from '../../../core/usecases/patients/get-patient.usecase';
// import PatientEntity from '../../../core/domain/entities/patient.entity';
// import PatientEntity just to know if my useCase returns that type

class PatientController {
  constructor(
    private registerPatient: RegisterPatientUseCase,
    private getPatient: GetPatientUseCase,
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

  async getPatients(req: Request, res: Response) {
    const patients = await this.getPatient.getAll();

    res.status(200).json(patients);
  }
}

export default PatientController;
