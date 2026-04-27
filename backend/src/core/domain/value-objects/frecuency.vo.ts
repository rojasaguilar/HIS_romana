export class Frecuency {
  constructor(public timesPerDay: number) {
    if (timesPerDay <= 0 || timesPerDay > 24)
      throw new Error(`Invalid frecuency`);
  }
}
