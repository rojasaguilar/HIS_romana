export class PasswordsDoesNotMatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordsDoesNotMatchError';
  }
}

export class CredentialsDoesNotMatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CredentialsDoesNotMatchError';
  }
}

export class InvalidPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}

export class InvalidSystemAccountState extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidSystemAccountState';
  }
}
