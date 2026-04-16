export class InvalidBloodTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidBloodTypeError';
  }
}
