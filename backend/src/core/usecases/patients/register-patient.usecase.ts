import { PatientMapper } from '../../../infraestructure/dataproviders/mongodb-dataprovider/mappers/patient.mapper';
import { RegisterPatientDTO } from '../../domain/dtos/patient.dto';
import PatientEntity from '../../domain/entities/patient.entity';
import { parseBloodType } from '../../domain/types/blood.type';
import { Address } from '../../domain/value-objects/address.vo';
import { EmergencyContact } from '../../domain/value-objects/emergencyContact.vo';
import { LegalGuardian } from '../../domain/value-objects/legalGuardian.vo';
import { Relationship } from '../../domain/value-objects/relationship.vo';
import { IPatientRepository } from './../../domain/repositories/patient.repository.interface';

export class RegisterPatientUseCase {
  constructor(private patientRepo: IPatientRepository) {}

  async execute(data: RegisterPatientDTO): Promise<PatientEntity> {
    // const patientToSave = PatientMapper.toDomain(data);

    const address = Address.create({
      street: data.address.street,
      number: data.address.number,
      city: data.address.city,
      state: data.address.state,
      zipCode: data.address.zipCode,
    });

    const emergencyContact = data.emergencyContact
      ? EmergencyContact.create({
          name: data.emergencyContact.name,

          phoneNumber: data.emergencyContact.phoneNumber,
          relationship: data.emergencyContact.relationship,
        })
      : undefined;

    const legalGuardian = data.legalGuardian
      ? new LegalGuardian(
          data.legalGuardian.name,
          Relationship.create(data.legalGuardian.relationship).getValue(),
        )
      : undefined;

    const newPatient = PatientEntity.create({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address,
      birthDate: data.birthDate,
      allergies: data.allergies,
      sex: data.sex,
      maritalStatus: data.maritalStatus,
      nationality: data.nationality,
      bloodType: parseBloodType(data.bloodType),

      emergencyContact,
      ethnicity: data.ethnicity,
      legalGuardian,
    });

    const savedPatient = await this.patientRepo.save(newPatient);

    return savedPatient;
  }
}
