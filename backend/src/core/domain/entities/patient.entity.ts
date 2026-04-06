import { Address } from '../value-objects/address.vo';
import { EmergencyContact } from '../value-objects/emergencyContact.vo';
import { BloodType } from './../types/blood.type';

import validator from 'validator';

export class PatientEntity {
  constructor(
    public name: string,
    public email: string,
    public phoneNumber: string,
    public address: Address,
    public birthDate: string,
    public allergies: string[],

    //medical stuff
    public bloodType: BloodType,

    public readonly id?: string,
    public emergencyContact?: EmergencyContact,
  ) {
    if (!validator.isEmail(this.email))
      throw new Error('Invalid email address');
  }

  public isUniversalDonator(): boolean {
    return this.bloodType === 'O-';
  }

  // public setAllergies()
}

export default PatientEntity;
