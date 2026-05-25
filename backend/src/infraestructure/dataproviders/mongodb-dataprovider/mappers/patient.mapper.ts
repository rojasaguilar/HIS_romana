import PatientEntity from '../../../../core/domain/entities/patient.entity';

import { parseBloodType } from '../../../../core/domain/types/blood.type';
import { Address } from '../../../../core/domain/value-objects/address.vo';
import { EmergencyContact } from '../../../../core/domain/value-objects/emergencyContact.vo';
import { LegalGuardian } from '../../../../core/domain/value-objects/legalGuardian.vo';
import { Relationship } from '../../../../core/domain/value-objects/relationship.vo';
import { PatientDocument } from '../models/patient.model';

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
      sex: dto.sex,
      maritalStatus: dto.maritalStatus,
      nationality: dto.nationality,
      bloodType: parseBloodType(dto.bloodType),
      emergencyContact: dto.emergencyContact
        ? EmergencyContact.create({
            name: dto.emergencyContact.name,
            phoneNumber: dto.emergencyContact.phoneNumber,
            relationship: dto.emergencyContact.relationship,
          })
        : undefined,
      id: dto._id.toString(),
      ethnicity: dto.ethnicity,
      legalGuardian: dto.legalGuardian
        ? new LegalGuardian(
            dto.legalGuardian.name,
            Relationship.create(dto.legalGuardian.relationship).getValue(),
          )
        : undefined,
    });
  }

  static toPersistance(patient: PatientEntity) {
    return patient as Object;
  }
}
