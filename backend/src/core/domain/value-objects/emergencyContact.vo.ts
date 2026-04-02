import { isMobilePhone } from "validator";

export class EmergencyContact {
  constructor(
    public readonly name: string,
    public readonly phoneNumber: string,
  ) {
    if (!isMobilePhone) throw new Error("Numero de telefono inválido");
  }
}
