import { ServiceEntity } from '../../../../core/domain/entities/services.entity';
import { IServicesRepository } from '../../../../core/domain/repositories/services.repository.interface';
import { ServiceMapper } from '../mappers/service.mapper';
import serviceModel from './../models/service.model';

export class ServiceRepository implements IServicesRepository {
  async save(service: ServiceEntity): Promise<ServiceEntity> {
    const data = ServiceMapper.toPersistence(service);

    const serviceDoc = await serviceModel.create(data);

    return ServiceMapper.toDomain(serviceDoc);
  }

  async findById(id: string): Promise<ServiceEntity | null> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<ServiceEntity[]> {
    throw new Error('Method not implemented.');
  }
}
