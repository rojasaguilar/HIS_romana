export class PatientNotFoundError extends Error {
  constructor() {
    super("El paciente no ha sido encontrado");
    this.name = "PatientNotFoundError";
  }
}

export class PatientAlreadyExistError extends Error {
  constructor() {
    super("El paciente ya existe");
    this.name = "PatientAlreadyExistError";
  }
}
