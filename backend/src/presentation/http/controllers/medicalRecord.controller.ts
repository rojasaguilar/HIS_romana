import { Request, Response } from 'express';
import { GenerateMedicalRecordUseCase } from '../../../core/usecases/medicalRecord/generate-medicalRecord.usecase';
import { CreateMedicalRecordDTO } from '../../../core/domain/dtos/medicalRecord.dto';

export class MedicalRecordController {
  constructor(
    private readonly generateMedRecUseCase: GenerateMedicalRecordUseCase,
  ) {}

  async generateMedicalRecord(
    req: Request<CreateMedicalRecordDTO>,
    res: Response,
  ) {
    const data = req.body;
    const record = await this.generateMedRecUseCase.execute(data);

    res.status(201).json(record);
  }
}
