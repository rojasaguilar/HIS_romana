export class AppointmentNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentNotFoundError';
  }
}

export class AppointmentAlreadyExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentAlreadyExistError';
  }
}

export class AppointmentCanNotBeCancelled extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentCanNotBeCancelled';
  }
}
