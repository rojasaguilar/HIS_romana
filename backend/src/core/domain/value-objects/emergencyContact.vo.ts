import validator from 'validator';
import { PersonalInfoValidationError } from '../errors/personal-info.error';

export class EmergencyContact {
  private constructor(
    public readonly name: string,
    public readonly phoneNumber: string,
    public readonly relation: string,
  ) {
    if (!validator.isMobilePhone(this.phoneNumber))
      throw new PersonalInfoValidationError(`Mobile phone is not valid`);
  }

  static create(data: { name: string; phoneNumber: string; relation: string }) {
    return new EmergencyContact(data.name, data.phoneNumber, data.relation);
  }
}
