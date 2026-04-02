import { isPostalCode } from "validator";
export class Address {
  constructor(
    public readonly street: string,
    public readonly number: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string,
  ) {
    if (!isPostalCode(zipCode, "MX")) throw new Error("Código postal invalido");
  }
}
