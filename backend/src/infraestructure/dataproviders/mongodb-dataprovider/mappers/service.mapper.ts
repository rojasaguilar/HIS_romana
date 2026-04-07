import { ServiceEntity } from '../../../../core/domain/entities/services.entity';

export class ServiceMapper {
  static toDomain(doc: any) {
    return new ServiceEntity(
      doc.name,
      doc.duration,
      doc.cost,
      doc.specialityIds.map((id: any) => id.toString()),
      doc._id.toString(),
    );
  }

  static toPersistence(entity: ServiceEntity) {
    return {
      name: entity.name,
      duration: entity.duration,
      cost: entity.cost,
      specialityIds: entity.specialityIds,
    };
  }
}
