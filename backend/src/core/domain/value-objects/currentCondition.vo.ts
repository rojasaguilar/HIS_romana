export class CurrentCondition {
  constructor(
    public readonly diseaseId: number,
    public readonly since: Date,
    public readonly diagnosedBy?: string,
  ) {
    if (since.getDate() > new Date().getDate())
      throw new Error(`Date of current condition invalid`);
  }
}
