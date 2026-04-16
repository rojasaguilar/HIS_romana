import validator from 'validator';
import { AddressInconsistentStateError } from '../errors/address.error';
export class Address {
  private constructor(
    public readonly street: string,
    public readonly number: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string,
  ) {
    if (!validator.isPostalCode(zipCode, 'MX'))
      throw new AddressInconsistentStateError(`Postal code is not valid`);
  }

  static create(data: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  }) {
    return new Address(
      data.street,
      data.number,
      data.city,
      data.state,
      data.zipCode,
    );
  }
}
