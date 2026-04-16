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
