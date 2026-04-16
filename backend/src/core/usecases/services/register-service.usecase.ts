import { ServiceEntity } from '../../domain/entities/services.entity';
import { SpecialityNotFoundError } from '../../domain/errors/speciality.error';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';

export interface CreateServiceDTO {
  name: string;
  duration: number;
  cost: number;
  specialityId: string;
}

export class RegisterServiceUseCase {
  constructor(
    private readonly serviceRepository: IServicesRepository,
    private readonly specialityRepository: ISpecialityRepository,
  ) {}

  async execute(dto: CreateServiceDTO): Promise<ServiceEntity> {
    const spec = await this.specialityRepository.findById(dto.specialityId);

    if (!spec)
      throw new SpecialityNotFoundError(
        `Speciality with id: ${dto.specialityId} not found`,
      );

    const serviceToSave = new ServiceEntity(
      dto.name,
      dto.duration,
      dto.cost,
      dto.specialityId,
    );

    return await this.serviceRepository.save(serviceToSave);
  }
}
