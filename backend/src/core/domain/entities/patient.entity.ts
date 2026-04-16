import { InvalidBloodTypeError } from '../errors/blood_type.error';
import { PatientInconsistentStateError } from '../errors/patient.errors';
import { PersonalInfoValidationError } from '../errors/personal-info.error';
import { Address } from '../value-objects/address.vo';
import { EmergencyContact } from '../value-objects/emergencyContact.vo';
import { BloodType, BLOOD_TYPE } from './../types/blood.type';

import validator from 'validator';

export class PatientEntity {
  private constructor(
    public name: string,
    public email: string,
    public phoneNumber: string,
    public address: Address,
    public birthDate: string,
    public allergies: string[],

    //medical stuff
    public bloodType: BloodType,

    public isActive: boolean,

    public emergencyContact?: EmergencyContact,
    public readonly id?: string,
  ) {
    if (!validator.isEmail(this.email))
      throw new Error('Invalid email address');
  }

  public isUniversalDonator(): boolean {
    return this.bloodType === BLOOD_TYPE.O_NEGATIVO;
  }

  static create(data: {
    name: string;
    email: string;
    phoneNumber: string;
    address: Address;
    birthDate: string;
    allergies: string[];
    bloodType: BloodType;
    isActive: boolean;
    emergencyContact?: EmergencyContact;
    id?: string;
  }): PatientEntity {
    if (!data.name || data.name.trim().length === 0)
      throw new PatientInconsistentStateError('Name is required');

    if (!data.email || data.email.trim().length === 0)
      throw new PatientInconsistentStateError('Email is required');

    if (!data.phoneNumber || data.phoneNumber.trim().length === 0)
      throw new PatientInconsistentStateError('Phone number is required');

    if (!validator.isMobilePhone(data.phoneNumber)) {
      throw new PersonalInfoValidationError(`Mobile phone is not valid`);
    }

    if (!validator.isEmail(data.email)) {
      throw new PersonalInfoValidationError(`Email is not valid`);
    }

    if (!data.address)
      throw new PatientInconsistentStateError('Address number is required');

    if (!this.isValidBloodType(data.bloodType)) {
      throw new InvalidBloodTypeError(
        `Blood type: ${data.bloodType} is not valid`,
      );
    }
    if (!data.birthDate || data.birthDate.trim().length === 0)
      throw new PatientInconsistentStateError('Birthday is required');

    return new PatientEntity(
      data.name,
      data.email,
      data.phoneNumber,
      data.address,
      data.birthDate,
      data.allergies,
      data.bloodType,
      data.isActive,
      data.emergencyContact,
      data.id,
    );
  }

  private static isValidBloodType(bloodType: BloodType): boolean {
    const validBloodTypes = Object.values(BLOOD_TYPE);

    return validBloodTypes.includes(bloodType);
  }
}

export default PatientEntity;
