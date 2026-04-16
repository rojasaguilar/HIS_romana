import { MedicType } from "../types/medic.type";

export class MedicEntity {
  constructor(
    public name: string,
    public email: string,
    public phoneNumber: string,
    public healthLicenseNumber: string, //noRegistroSalubridad,
    public professionalLicenceNumber: string,
    public languages: string[],
    public specialityIds: string[],
    public medicalSchool: string,
    public startPracticeDate: Date,
    public bio: string,
    public consultationFee: number,
    public profilePictureUrl: string,
    public isActive: boolean,
    public type: MedicType,
    public organizationId?: string,
    public id?: string,
  ) {}

  public canPerform(specialityIds: string[]){
    return 
  }
}
