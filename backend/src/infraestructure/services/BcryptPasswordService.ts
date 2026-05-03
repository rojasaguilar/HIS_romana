import { IPasswordService } from '../../core/domain/interfaces/password.service';
import bcrypt from 'bcryptjs';

export class BcryptPasswordService implements IPasswordService {
  async hashPassword(unhashedPass: string): Promise<string> {
    return await bcrypt.hash(unhashedPass, 13);
  }

  async isPasswordCorrect(
    candidatePassword: string,
    actualPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, actualPassword);
  }
}
