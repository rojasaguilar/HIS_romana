import { Request, Response } from 'express';
import { RegisterSpecialityUseCase } from '../../../core/usecases/speciality/register-speciality.usecase';
import { GetAllSpecialitiesUseCase } from '../../../core/usecases/services/getAll-specialities.usecase';
import { GetSpecialityByIdUseCase } from '../../../core/usecases/speciality/get-speciality.usecase';

export class SpecialityController {
  constructor(
    private readonly registerSpecialityUseCase: RegisterSpecialityUseCase,
    private readonly getAllSpecilitiesUseCase: GetAllSpecialitiesUseCase,
    private readonly getSpecialityByIdUseCase: GetSpecialityByIdUseCase,
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
}
