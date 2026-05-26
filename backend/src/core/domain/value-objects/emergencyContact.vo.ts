import validator from 'validator';
import { PersonalInfoValidationError } from '../errors/personal-info.error';

export class EmergencyContact {
  private constructor(
    public readonly name: string,
    public readonly phoneNumber: string,
    public readonly relationship: string,
  ) {}

  static create(data: {
    name: string;
    phoneNumber: string;
    relationship: string;
  }) {
    if (!validator.isMobilePhone(data.phoneNumber))
      throw new PersonalInfoValidationError(
        `Mobile phone ${data.phoneNumber}is not valid`,
      );
    return new EmergencyContact(data.name, data.phoneNumber, data.relationship);
  }
}
