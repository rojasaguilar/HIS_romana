export class MedicalRecordNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MedicalRecordNotFoundError';
  }
}

export class InconsistantMedicalRecordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InconsistantMedicalRecordError';
  }
}

export class MedicalRecordAlreadyExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MedicalRecordAlreadyExistError';
  }
}
