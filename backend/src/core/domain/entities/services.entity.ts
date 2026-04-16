export class ServiceEntity {
  constructor(
    public name: string,
    public duration: number,
    public cost: number,
    public specialityId: string,
    public readonly id?: string,
  ) {}
}
