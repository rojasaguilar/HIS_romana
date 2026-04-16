import { Request, Response } from 'express';
import { RegisterServiceUseCase } from '../../../core/usecases/services/register-service.usecase';
import { CreateServiceDTO } from '../../../core/usecases/services/register-service.usecase';
import { GetServicesUseCase } from '../../../core/usecases/services/get-services.usecase';
import { GetServiceByIdUseCase } from '../../../core/usecases/services/get-serviceById.usecase';

export class ServiceController {
  constructor(
    private readonly registerServiceUseCase: RegisterServiceUseCase,
    private readonly getServicesUseCase: GetServicesUseCase,
    private readonly getServiceByIdUseCase: GetServiceByIdUseCase,
  ) {}

  async createService(req: Request<CreateServiceDTO>, res: Response) {
    const createdService = await this.registerServiceUseCase.execute(req.body);

    res.status(201).json(createdService);
  }

  async getAllServices(req: Request, res: Response) {
    const services = await this.getServicesUseCase.getAll();

    res.status(200).json(services);
  }

  async getServiceById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const service = await this.getServiceByIdUseCase.execute(id);

    res.status(200).json(service);
  }
}
