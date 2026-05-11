import { ServiceEntity } from '../entities/services.entity';

export interface IServicesRepository {
  save(service: ServiceEntity): Promise<ServiceEntity>;

  findById(id: string): Promise<ServiceEntity | null>;

  findByName(name: string): Promise<ServiceEntity | null>;

  getAll(): Promise<ServiceEntity[]>;

  update(id:string, service:ServiceEntity): Promise<ServiceEntity | null>;

  findByIds(ids: string[]): Promise<{ id: string }[]>;
}
