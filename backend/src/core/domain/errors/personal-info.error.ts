export class PersonalInfoValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PersonalInfoValidationError';
  }
}
