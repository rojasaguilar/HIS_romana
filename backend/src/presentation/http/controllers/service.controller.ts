import { Request, Response } from 'express';
import { RegisterServiceUseCase } from '../../../core/usecases/services/register-service.usecase';
import { CreateServiceDTO } from '../../../core/usecases/services/register-service.usecase';
import { GetServicesUseCase } from '../../../core/usecases/services/get-services.usecase';

export class ServiceController {
  constructor(
    private readonly registerService: RegisterServiceUseCase,
    private readonly getServices: GetServicesUseCase,
  ) {}

  async createService(req: Request<CreateServiceDTO>, res: Response) {
    const createdService = await this.registerService.execute(req.body);

    res.status(201).json(createdService);
  }

  async getAllServices(req: Request, res: Response) {
    const services = await this.getServices.getAll();

    res.status(200).json(services);
  }
}
