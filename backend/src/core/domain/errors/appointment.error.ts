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

export class AppointmentCanNotBeReschedule extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentCanNotBeReschedule';
  }
}

export class AppointmentCanNotBeCompleted extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentCanNotBeCompleted';
  }
}

export class AppointmentDateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentDateError';
  }
}

export class AppointmentInconsistentStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentInconsistentStateError';
  }
}
