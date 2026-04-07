import { ServiceEntity } from '../../domain/entities/services.entity';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';

export interface CreateServiceDTO {
  name: string;
  duration: number;
  cost: number;
  specialityIds: string[];
}

export class RegisterServiceUseCase {
  constructor(public readonly serviceRepository: IServicesRepository) {}

  async execute(data: CreateServiceDTO): Promise<ServiceEntity> {

    const serviceToSave = new ServiceEntity(
      data.name,
      data.duration,
      data.cost,
      data.specialityIds,
    );

    return await this.serviceRepository.save(serviceToSave);
  }
}
