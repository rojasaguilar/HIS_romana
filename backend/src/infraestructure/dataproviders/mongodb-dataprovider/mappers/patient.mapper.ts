import { PatientDocument } from '../../../../core/domain/dtos/patient.dto';
import PatientEntity from '../../../../core/domain/entities/patient.entity';

import { parseBloodType } from '../../../../core/domain/types/blood.type';
import { Address } from '../../../../core/domain/value-objects/address.vo';

export class PatientMapper {
  static toDomain(dto: PatientDocument) {
    const address = Address.create({
      street: dto.address.street,
      number: dto.address.number,
      city: dto.address.city,
      state: dto.address.state,
      zipCode: dto.address.zipCode,
    });

    return PatientEntity.create({
      name: dto.name,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      address,
      birthDate: dto.birthDate,
      allergies: dto.allergies,
      bloodType: parseBloodType(dto.bloodType),
      isActive: dto.isActive,
      emergencyContact: dto.emergencyContact,
      id: dto._id.toString(),
    });
  }

  static toPersistance(patient: PatientEntity) {
    return patient as Object;
  }
}
