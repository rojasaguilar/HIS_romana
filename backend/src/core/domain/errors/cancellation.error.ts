export class CancellationError extends Error {
  super(message: string) {
    this.super(message);
    this.name = 'CancellationError';
  }
}
