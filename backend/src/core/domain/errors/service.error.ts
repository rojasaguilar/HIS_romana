export class ServiceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceNotFoundError';
  }
}

export class ServiceAlreadyExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceAlreadyExistError';
  }
}

export class ServiceCanNotBePerformedByMedicError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceCanNotBePerformedByMedicError';
  }
}

export class ServiceInconsistentStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceInconsistentStateError';
  }
}

export class ServiceModalityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceModalityError';
  }
}
