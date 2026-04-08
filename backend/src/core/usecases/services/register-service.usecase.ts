import { ServiceEntity } from '../../domain/entities/services.entity';
import { SpecialityNotFoundError } from '../../domain/errors/speciality.error';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';

export interface CreateServiceDTO {
  name: string;
  duration: number;
  cost: number;
  specialityIds: string[];
}

export class RegisterServiceUseCase {
  constructor(
    private readonly serviceRepository: IServicesRepository,
    private readonly specialityRepository: ISpecialityRepository,
  ) {}

  async execute(data: CreateServiceDTO): Promise<ServiceEntity> {

    for (const specialityId of data.specialityIds) {
      const spec = await this.specialityRepository.findById(specialityId);

      if (!spec)
        throw new SpecialityNotFoundError(
          `Speciality with id: ${specialityId} not found`,
        );
    }

    const serviceToSave = new ServiceEntity(
      data.name,
      data.duration,
      data.cost,
      data.specialityIds,
    );

    return await this.serviceRepository.save(serviceToSave);
  }
}
