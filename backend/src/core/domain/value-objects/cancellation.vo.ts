import { CancellationError } from '../errors/cancellation.error';
import { CancellationActor } from '../types/cancellation-actor.type';

export interface CancellationDTO {
  readonly cancelledBy: CancellationActor;
  readonly reason: string;
  readonly cancelationDate: Date;
}

export class Cancellation {
  constructor(
    public readonly cancelledBy: CancellationActor,
    public readonly reason: string,
    public readonly cancelationDate: Date,
  ) {
    if (!reason) {
      throw new CancellationError(
        `Reason must be specified on appointment cancellation`,
      );
    }

    if (!cancelledBy) {
      throw new CancellationError(
        `There must be an user who cancelled the appointmet`,
      );
    }

    if (!cancelationDate) {
      throw new CancellationError(`A cancellation date must be specified`);
    }
  }

  static createCancellation(cancelation: CancellationDTO): Cancellation {
    return new Cancellation(
      cancelation.cancelledBy,
      cancelation.reason,
      cancelation.cancelationDate,
    );
  }
}
