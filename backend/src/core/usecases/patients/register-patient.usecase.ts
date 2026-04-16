import { RegisterPatientDTO } from '../../domain/dtos/patient.dto';
import PatientEntity from '../../domain/entities/patient.entity';
import { parseBloodType } from '../../domain/types/blood.type';
import { Address } from '../../domain/value-objects/address.vo';
import { EmergencyContact } from '../../domain/value-objects/emergencyContact.vo';
import { IPatientRepository } from './../../domain/repositories/patient.repository.interface';

export class RegisterPatientUseCase {
  constructor(private patientRepo: IPatientRepository) {}

  async execute(data: RegisterPatientDTO): Promise<PatientEntity> {
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
          relation: data.emergencyContact.relation,
        })
      : undefined;

    const newPatient = PatientEntity.create({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address,
      birthDate: data.birthDate,
      allergies: data.allergies,
      isActive: true,
      bloodType: parseBloodType(data.bloodType),

      emergencyContact,
    });

    const savedPatient = await this.patientRepo.save(newPatient);

    return savedPatient;
  }
}
