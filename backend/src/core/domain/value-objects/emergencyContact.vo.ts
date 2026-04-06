import validator from 'validator';

export class EmergencyContact {
  constructor(
    public readonly name: string,
    public readonly phoneNumber: string,
    public readonly relation: string
  ) {
    if (!validator.isMobilePhone)
      throw new Error('Numero de telefono inválido');
  }
}
