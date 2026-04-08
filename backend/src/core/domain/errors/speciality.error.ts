export class SpecialityNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SpecialityNotFoundError';
  }
}

export class SpecialityAlreadyExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SpecialityAlreadyExistError';
  }
}
