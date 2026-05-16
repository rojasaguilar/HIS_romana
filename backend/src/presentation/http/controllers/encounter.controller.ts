import { Request, Response } from 'express';
import { CreateEncounterUseCase } from '../../../core/usecases/encounters/create-encounter.usecase';
import { GetEncounterByAppointmentUseCase } from '../../../core/usecases/encounters/getEncounterByAppointment-usecse';
import { GetPatientEncountersUseCase } from '../../../core/usecases/encounters/getPatient-encounters.usecase';
import { asyncHandler } from '../middlewares/asyncHandler';
import { EncounterProps } from '../../../core/domain/entities/encounter.entity';

export class EncounterController {
  constructor(
    private readonly createEncounterUseCase: CreateEncounterUseCase,
    private readonly getPatientEncountersUseCase: GetPatientEncountersUseCase,
    private readonly getEncounterByAppointmentUseCase: GetEncounterByAppointmentUseCase,
  ) {}

  createEncounter = asyncHandler(
    async (req: Request, res: Response) => {
      const data = req.body;
      const encounter = await this.createEncounterUseCase.execute(data);

      res.status(201).json(encounter);
    },
  );

  getPatientEncounters = asyncHandler(
    async (req: Request<{ patientId: string }>, res: Response) => {
      const { patientId } = req.params;
      const encounters =
        await this.getPatientEncountersUseCase.execute(patientId);

      res.status(200).json(encounters);
    },
  );

  getEncounterByAppointment = asyncHandler(
    async (req: Request<{ appointmentId: string }>, res: Response) => {
      const { appointmentId } = req.params;
      const encounter =
        await this.getEncounterByAppointmentUseCase.execute(appointmentId);

      if (!encounter) {
        res
          .status(404)
          .json({ message: 'Nota clínica no encontrada para esta cita' });
        return;
      }

      res.status(200).json(encounter);
    },
  );
}
