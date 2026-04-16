export class PatientNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PatientNotFoundError';
  }
}

export class PatientAlreadyExistError extends Error {
  constructor() {
    super('El paciente ya existe');
    this.name = 'PatientAlreadyExistError';
  }
}

export class PatientInconsistentStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PatientInconsistentStateError';
  }
}
