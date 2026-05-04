import { IReceptionistRepository } from '../../domain/repositories/receptionist.repository.interface';

export class GetAllReceptionistUseCase {
  constructor(
    private readonly recepcionistRepository: IReceptionistRepository,
  ) {}

  async execute() {
    return await this.recepcionistRepository.getAll();
  }
}
