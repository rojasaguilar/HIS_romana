import { Request, Response } from 'express';
import { GetMedicUseCase } from '../../../core/usecases/medic/get-medic.usecase';

import {
  RegisterMedicDTO,
  RegisterMedicUseCase,
} from '../../../core/usecases/medic/register-medic.usecase';

export class MedicController {
  constructor(
    private registerMedicUseCase: RegisterMedicUseCase,
    private getMedicUseCase: GetMedicUseCase,
  ) {}

  async createMedic(req: Request<RegisterMedicDTO>, res: Response) {
    console.log('Request object', req);
    console.log('Request body', req.body);

    const createdMedic = await this.registerMedicUseCase.execute(req.body);

    res.status(201).json(createdMedic);
  }

  async getMedicById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const medic = await this.getMedicUseCase.findById(id);

    res.status(200).json(medic);
  }
}
