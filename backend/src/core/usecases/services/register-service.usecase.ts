import { ServiceEntity } from '../../domain/entities/services.entity';
import { SpecialityNotFoundError } from '../../domain/errors/speciality.error';
import { IServicesRepository } from '../../domain/repositories/services.repository.interface';
import { ISpecialityRepository } from '../../domain/repositories/speciality.repository.interface';
import { ServiceModality } from '../../domain/types/service.type';

export interface CreateServiceDTO {
  name: string;
  duration: number;
  cost: number;
  modalities: ServiceModality[];
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

    const serviceToSave = ServiceEntity.create({
      name: dto.name,
      duration: dto.duration,
      cost: dto.cost,
      modalities: dto.modalities,
      specialityId: dto.specialityId,
    });

    return await this.serviceRepository.save(serviceToSave);
  }
}
