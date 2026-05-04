export interface IPasswordService {
  hashPassword(unhashedPass: string): Promise<string>;

  isPasswordCorrect(
    candidatePassword: string,
    actualPassword: string,
  ): Promise<boolean>;
}
