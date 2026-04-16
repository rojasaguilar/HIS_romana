export class AddressInconsistentStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AddressInconsistentStateError';
  }
}
