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
    const serviceDoc = await serviceModel.findById(id);

    return ServiceMapper.toDomain(serviceDoc);
  }

  async getAll(): Promise<ServiceEntity[]> {
    const servicesDocs = await serviceModel.find();

    return servicesDocs.map((doc) => ServiceMapper.toDomain(doc));
  }
}
