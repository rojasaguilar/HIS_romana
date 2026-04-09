export class MedicNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MedicNotFoundError';
  }
}

export class MedicAlreadyExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MedicAlreadyExistError';
  }
}
