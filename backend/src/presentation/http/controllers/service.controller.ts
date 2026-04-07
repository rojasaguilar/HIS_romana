import { Request, Response } from 'express';
import { RegisterServiceUseCase } from '../../../core/usecases/services/register-service.usecase';
import { CreateServiceDTO } from '../../../core/usecases/services/register-service.usecase';

export class ServiceController {
  constructor(private readonly registerService: RegisterServiceUseCase) {};

  async createService(req: Request<CreateServiceDTO>, res: Response) {
    const createdService = await this.registerService.execute(req.body);

    res.status(201).json(createdService);
  }
}
