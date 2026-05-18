import { IReceptionistRepository } from '../../domain/repositories/receptionist.repository.interface';

export class GetReceptionistByIdUseCase {
  constructor(
    private readonly recepcionistRepository: IReceptionistRepository,
  ) {}

  async execute(id: string) {
    const rec = await this.recepcionistRepository.findById(id);

    if (!rec) throw new Error(`Receptionist not found`);

    return rec;
  }
}
