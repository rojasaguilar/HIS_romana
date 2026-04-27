export class Dosage {
   constructor(
    public amount: number,
    public unit: string,
  ) {
    if (amount <= 0) throw new Error(`Invalid amount for a dosage`);
  }
}
