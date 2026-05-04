import { Request, Response } from 'express';
import { GenerateMedicalRecordUseCase } from '../../../core/usecases/medicalRecord/generate-medicalRecord.usecase';
import {
  CreateMedicalRecordDTO,
  UpdateMedicalRecordDTO,
} from '../../../core/domain/dtos/medicalRecord.dto';
import { GetAllMedicalRecordsUseCase } from '../../../core/usecases/medicalRecord/getAll-medicalRecord.usecase';
import { UpdateMedicalRecordUseCase } from '../../../core/usecases/medicalRecord/update-medicalRecord.usecase';

export class MedicalRecordController {
  constructor(
    private readonly generateMedRecUseCase: GenerateMedicalRecordUseCase,
    private readonly getAllMedicalRecordsUseCase: GetAllMedicalRecordsUseCase,
    private readonly updateMedicalRecordUseCase: UpdateMedicalRecordUseCase,
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

  async updateMedicalRecord(
    req: Request<{ id: string }, UpdateMedicalRecordDTO>,
    res: Response,
  ) {
    const { id } = req.params;
    const data = req.body;

    if (data.patientId) delete data.patientId;

    console.log(data);
    const updatedRecord = await this.updateMedicalRecordUseCase.execute(
      id,
      data,
    );

    res.status(200).json(updatedRecord);
  }
}
