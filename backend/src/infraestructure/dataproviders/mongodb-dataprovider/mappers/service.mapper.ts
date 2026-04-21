import { ServiceEntity } from '../../../../core/domain/entities/services.entity';

export class ServiceMapper {
  static toDomain(doc: any) {
    return ServiceEntity.create({
      name: doc.name,
      duration: doc.duration,
      cost: doc.cost,
      modalities: doc.modalities,
      specialityId: doc.specialityId.toString(),
      id: doc._id.toString(),
    });
  }

  static toPersistence(entity: ServiceEntity) {
    return {
      name: entity.name,
      duration: entity.duration,
      cost: entity.cost,
      modalities: entity.modalities.map((modality) => modality.toString()),
      specialityId: entity.specialityId,
    };
  }
}
