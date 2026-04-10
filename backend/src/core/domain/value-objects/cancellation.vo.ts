import { CancellationActor } from "../types/cancellation-actor.type";

export class Cancellation {
  constructor(
    public readonly cancelledBy: CancellationActor,
    public readonly reason: string,
    public readonly canceledAt: Date,
  ) {
    if (!reason) {
      throw new Error('Cancellation reason is required');
    }
  }
}