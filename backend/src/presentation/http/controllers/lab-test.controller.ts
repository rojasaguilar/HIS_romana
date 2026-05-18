import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { CreateLabTestUseCase } from '../../../core/usecases/lab-test/create-lab-test.usecase';
import { CompleteLabTestUseCase } from '../../../core/usecases/lab-test/complete-lab-test.usecase';
import { GetLabTestByIdUseCase } from '../../../core/usecases/lab-test/get-lab-testById.usecase';
import { GetPatientLabTestsUseCase } from '../../../core/usecases/lab-test/get-patient-lab-test.usecase';
import { GetEncounterLabTestsUseCase } from '../../../core/usecases/lab-test/get-encounter-lab-tests.usecase';

export class LabTestController {
  constructor(
    private readonly createLabTestUseCase: CreateLabTestUseCase,
    private readonly completeLabTestUseCase: CompleteLabTestUseCase,
    private readonly getLabTestByIdUseCase: GetLabTestByIdUseCase,
    private readonly getPatientLabTestsUseCase: GetPatientLabTestsUseCase,
    // private readonly getPendingLabTestsUseCase: GetP,
    private readonly getEncounterLabTestsUseCase: GetEncounterLabTestsUseCase,
  ) {}

  createLabTest = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const labTest = await this.createLabTestUseCase.execute(data);

    res.status(201).json(labTest);
  });

  completeLabTest = asyncHandler(
    async (req: Request<{ id: string }>, res: Response) => {
      const { id } = req.params;
      const { files, notes } = req.body;

      const labTest = await this.completeLabTestUseCase.execute({
        labTestId: id,
        files,
        notes,
      });

      res.status(200).json(labTest);
    },
  );

  getLabTestById = asyncHandler(
    async (req: Request<{ id: string }>, res: Response) => {
      const { id } = req.params;
      const labTest = await this.getLabTestByIdUseCase.execute(id);

      if (!labTest) {
        res
          .status(404)
          .json({ message: 'Estudio de laboratorio no encontrado' });
        return;
      }

      res.status(200).json(labTest);
    },
  );

  getPatientLabTests = asyncHandler(
    async (req: Request<{ patientId: string }>, res: Response) => {
      const { patientId } = req.params;
      const labTests = await this.getPatientLabTestsUseCase.execute(patientId);

      res.status(200).json(labTests);
    },
  );

  //   getPendingLabTests = asyncHandler(
  //     async (req: Request<{ patientId: string }>, res: Response) => {
  //       const { patientId } = req.params;
  //       const labTests = await this.getPendingLabTestsUseCase.execute(patientId);

  //       res.status(200).json(labTests);
  //     },
  //   );

  getEncounterLabTests = asyncHandler(
    async (req: Request<{ encounterId: string }>, res: Response) => {
      const { encounterId } = req.params;
      const labTests =
        await this.getEncounterLabTestsUseCase.execute(encounterId);

      res.status(200).json(labTests);
    },
  );
}
