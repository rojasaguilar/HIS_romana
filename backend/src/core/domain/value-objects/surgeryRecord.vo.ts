export class SurgeryRecord {
  constructor(
    public surgeryName: string,
    public surgeryDate: Date,
  ) {
    if (surgeryName.length <= 0) throw new Error(`Invalid surgery name`);
  }
}
