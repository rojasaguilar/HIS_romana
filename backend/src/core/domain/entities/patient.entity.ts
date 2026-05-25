import { InvalidBloodTypeError } from '../errors/blood_type.error';
import { PatientInconsistentStateError } from '../errors/patient.errors';
import { PersonalInfoValidationError } from '../errors/personal-info.error';
import { EstadoCivil } from '../types/martialStatus.type';
import { Address } from '../value-objects/address.vo';
import { EmergencyContact } from '../value-objects/emergencyContact.vo';
import { LegalGuardian } from '../value-objects/legalGuardian.vo';
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

    public sex: 'M' | 'F',
    public maritalStatus: EstadoCivil,
    public nationality: string,

    //medical stuff
    public bloodType: BloodType,

    public emergencyContact?: EmergencyContact,
    public readonly id?: string,
    public ethnicity?: string,
    public legalGuardian?: LegalGuardian,
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
    sex: 'M' | 'F';
    maritalStatus: EstadoCivil;
    nationality: string;
    bloodType: BloodType;
    emergencyContact?: EmergencyContact;
    id?: string;
    ethnicity?: string;
    legalGuardian?: LegalGuardian;
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
      data.sex,
      data.maritalStatus,
      data.nationality,
      data.bloodType,
      // data.isActive,
      data.emergencyContact,
      data.id,
      data.ethnicity,
      data.legalGuardian,
    );
  }

  private static isValidBloodType(bloodType: BloodType): boolean {
    const validBloodTypes = Object.values(BLOOD_TYPE);

    return validBloodTypes.includes(bloodType);
  }
}

export default PatientEntity;
