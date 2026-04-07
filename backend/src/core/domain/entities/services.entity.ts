export class ServiceEntity {
  constructor(
    public name: string,
    public duration: number,
    public cost: number,
    public specialityIds: string[],
    public readonly id?: string,
  ) {}
}
