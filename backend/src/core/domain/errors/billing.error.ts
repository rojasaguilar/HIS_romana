export class BillingInconsistentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BillingInconsistentError';
  }
}
