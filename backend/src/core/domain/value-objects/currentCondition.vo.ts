export class CurrentCondition {
  constructor(
    public readonly conditionId: number,
    public readonly since: string,
    public readonly diagnosedBy?: string,
  ) {
    // if (since.getDate() > new Date().getDate())
    //   throw new Error(`Date of current condition invalid`);
  }
}
