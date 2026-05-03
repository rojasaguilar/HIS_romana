import { Request, Response } from 'express';
import { GenerateMedicalRecordUseCase } from '../../../core/usecases/medicalRecord/generate-medicalRecord.usecase';
import { CreateMedicalRecordDTO } from '../../../core/domain/dtos/medicalRecord.dto';
import { GetAllMedicalRecordsUseCase } from '../../../core/usecases/medicalRecord/getAll-medicalRecord.usecase';

export class MedicalRecordController {
  constructor(
    private readonly generateMedRecUseCase: GenerateMedicalRecordUseCase,
    private readonly getAllMedicalRecordsUseCase: GetAllMedicalRecordsUseCase,
  ) {}

  async generateMedicalRecord(
    req: Request<CreateMedicalRecordDTO>,
    res: Response,
  ) {
    const data = req.body;
    const record = await this.generateMedRecUseCase.execute(data);

    res.status(201).json(record);
  }

  async getAllMedicalRecords(req: Request, res: Response) {
    const records = await this.getAllMedicalRecordsUseCase.execute();

    res.status(200).json({
      count: records.length,
      records,
    });
  }
}
