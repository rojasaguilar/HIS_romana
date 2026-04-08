import { SpecialityEntity } from '../../../../core/domain/entities/speciality.entity';

export class SpecialityMapper {
  static toDomain(doc: any): SpecialityEntity {
    return new SpecialityEntity(doc.name, doc._id.toString());
  }

  static toPersistence(entity: SpecialityEntity) {
    return {
      name: entity.name,
    };
  }
}
