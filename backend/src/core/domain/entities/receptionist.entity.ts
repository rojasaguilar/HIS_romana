export class ReceptionistEntity {
  constructor(
    public name: string,
    public email: string,
    public phoneNumber: string,
    public languages: string[],
    public isActive: boolean,
    public profilePictureUrl?: string,
    public id?: string,
  ) {}
}
