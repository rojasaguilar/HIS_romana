import { Request, Response } from 'express';
import { RegisterSpecialityUseCase } from '../../../core/usecases/speciality/register-speciality.usecase';

export class SpecialityController {
  constructor(
    public readonly registerSpecialityUseCase: RegisterSpecialityUseCase,
  ) {}

  async createSpeciality(req: Request, res: Response) {
    const createdSpeciality = await this.registerSpecialityUseCase.execute(
      req.body,
    );

    res.status(201).json(createdSpeciality);
  }
}
