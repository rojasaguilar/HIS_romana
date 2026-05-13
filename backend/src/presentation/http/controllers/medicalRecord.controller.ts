import { Request, Response } from 'express';
import { GenerateMedicalRecordUseCase } from '../../../core/usecases/medicalRecord/generate-medicalRecord.usecase';
import {
  CreateMedicalRecordDTO,
  UpdateMedicalRecordDTO,
} from '../../../core/domain/dtos/medicalRecord.dto';
import { GetAllMedicalRecordsUseCase } from '../../../core/usecases/medicalRecord/getAll-medicalRecord.usecase';
import { UpdateMedicalRecordUseCase } from '../../../core/usecases/medicalRecord/update-medicalRecord.usecase';
import { GetMedicalRecordByPatientIdUseCase } from '../../../core/usecases/medicalRecord/get-medicalRecord-byPatientId.usecase';

export class MedicalRecordController {
  constructor(
    private readonly generateMedRecUseCase: GenerateMedicalRecordUseCase,
    private readonly getAllMedicalRecordsUseCase: GetAllMedicalRecordsUseCase,
    private readonly updateMedicalRecordUseCase: UpdateMedicalRecordUseCase,
    private readonly getMedicalRecordByPatientIdUseCase: GetMedicalRecordByPatientIdUseCase,
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

  async getMedicalRecordByPatientId(
    req: Request<{ patientId: string }>,
    res: Response,
  ) {
    try {
      // 1. Extraemos de params (asumiendo que tu ruta es GET /medical-records/:patientId)
      const { patientId } = req.params;

      // 2. Ejecutamos el caso de uso
      const record =
        await this.getMedicalRecordByPatientIdUseCase.execute(patientId);

      // 3. Devolvemos el status 200 (OK) con la información
      return res.status(200).json(record);
    } catch (error: any) {
      // 4. Atrapamos el error. Dependiendo de tu lógica, puede ser 404 (No encontrado) o 400 (Bad Request)
      return res.status(404).json({
        message:
          error.message || 'Ocurrió un error al obtener el expediente médico.',
      });
    }
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
