import { ServiceNotFoundError } from '../../domain/errors/service.error';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';

export class GetServiceByIdUseCase {
  constructor(private readonly serviceRepository: IServicesRepository) {}

  async execute(id: string) {
    const service = await this.serviceRepository.findById(id);

    if (!service)
      throw new ServiceNotFoundError(`Service with id: ${id} not found`);

    return service;
  }
}
