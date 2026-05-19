import { Request, Response } from 'express';
import { RegisterSpecialityUseCase } from '../../../core/usecases/speciality/register-speciality.usecase';
import { GetAllSpecialitiesUseCase } from '../../../core/usecases/speciality/getAll-specialities.usecase';
import { GetSpecialityByIdUseCase } from '../../../core/usecases/speciality/get-speciality.usecase';
import { asyncHandler } from '../middlewares/asyncHandler';
import {
  UpdateSpecialityDTO,
  UpdateSpecialityUseCase,
} from '../../../core/usecases/speciality/update-speciality.usecase';

export class SpecialityController {
  constructor(
    private readonly registerSpecialityUseCase: RegisterSpecialityUseCase,
    private readonly getAllSpecilitiesUseCase: GetAllSpecialitiesUseCase,
    private readonly getSpecialityByIdUseCase: GetSpecialityByIdUseCase,
    private readonly updateSpecialityUseCase: UpdateSpecialityUseCase,
  ) {}

  async createSpeciality(req: Request, res: Response) {
    const createdSpeciality = await this.registerSpecialityUseCase.execute(
      req.body,
    );

    res.status(201).json(createdSpeciality);
  }

  async getAllSpecialities(req: Request, res: Response) {
    const specialities = await this.getAllSpecilitiesUseCase.execute();

    res.status(200).json(specialities);
  }

  async getSpecialityById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const speciality = await this.getSpecialityByIdUseCase.execute(id);

    res.status(200).json(speciality);
  }

  updateSpeciality = asyncHandler(
    async (
      req: Request<{ id: string; data: UpdateSpecialityDTO }>,
      res: Response,
    ) => {
      const { id } = req.params;
      const data = req.body;

      const upadtedSpeciality = await this.updateSpecialityUseCase.execute(
        id,
        data,
      );

      res.status(200).json(upadtedSpeciality);
    },
  );
}
