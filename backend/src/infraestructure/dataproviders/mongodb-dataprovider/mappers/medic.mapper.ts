import { MedicEntity } from '../../../../core/domain/entities/medic.entity';

export class MedicMapper {
  static toDomain(doc: any) {
    return new MedicEntity(
      doc.name,
      doc.email,
      doc.phoneNumber,
      doc.healthLicenseNumber,
      doc.professionalLicenceNumber,
      doc.languages,
      doc.specialityIds.map((id: any) => id.toString()),
      doc.medicalSchool,
      doc.startPracticeDate,
      doc.bio,
      doc.consultationFee,
      doc.profilePictureUrl,
      doc.isActive,
      doc.type,
      doc.organizationId,
      doc._id.toString(),
    );
  }

  static toPersistence(entity: MedicEntity) {
    return {
      name: entity.name,
      email: entity.email,
      phoneNumber: entity.phoneNumber,
      healthLicenseNumber: entity.healthLicenseNumber,
      professionalLicenceNumber: entity.professionalLicenceNumber,
      languages: entity.languages,
      specialityIds: entity.specialityIds,
      medicalSchool: entity.medicalSchool,
      startPracticeDate: entity.startPracticeDate,
      bio: entity.bio,
      consultationFee: entity.consultationFee,
      profilePictureUrl: entity.profilePictureUrl,
      isActive: entity.isActive,
      type: entity.type,
      organizationId: entity.organizationId,
    };
  }
}
