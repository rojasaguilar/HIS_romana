import { ServiceRepository } from '../../../infraestructure/dataproviders/mongodb-dataprovider/repositories/services.repository';
import { ServiceEntity } from '../../domain/entities/services.entity';

export class GetServicesUseCase {
  constructor(public readonly serviceRepository: ServiceRepository) {}

  async getAll(): Promise<ServiceEntity[]> {
    return await this.serviceRepository.getAll();
  }
}
