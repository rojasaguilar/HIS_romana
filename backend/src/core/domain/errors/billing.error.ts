export class BillingInconsistentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BillingInconsistentError';
  }
}

export class InvalidBillingType extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidBillingType';
  }
}
