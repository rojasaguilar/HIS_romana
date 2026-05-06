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

    return serviceDoc ? ServiceMapper.toDomain(serviceDoc) : null;
  }

  async getAll(): Promise<ServiceEntity[]> {
    const servicesDocs = await serviceModel.find();

    return servicesDocs.map((doc) => ServiceMapper.toDomain(doc));
  }

  async findByName(name: string): Promise<ServiceEntity | null> {
    const serviceDoc = await serviceModel.findOne({ name });

    return serviceDoc ? ServiceMapper.toDomain(serviceDoc) : null;
  }
  async findByIds(ids: string[]): Promise<{ id: string }[]> {
    const services = await serviceModel
      .find({
        _id: { $in: ids },
      })
      .select('_id')
      .lean();

    return services.map((s) => ({
      id: s._id.toString(),
    }));
  }
}
