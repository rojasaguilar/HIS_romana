import {
  InvalidPasswordError,
  InvalidSystemAccountState,
  PasswordsDoesNotMatchError,
} from '../errors/account.error';
import { Role } from '../types/role.type';
import bcrypt from 'bcryptjs';

export class SystemAccount {
  constructor(
    public readonly id: string,
    public email: string,
    public roles: Role[],
    private password: string,
    private readonly userId: string,
    private profileType: 'MEDIC' | 'RECEPSIONIST',
  ) {}

  public hasRole(requiredRole: Role) {
    return this.roles.includes(requiredRole);
  }

  public addRole(roleToAdd: Role) {
    if (this.roles.includes(roleToAdd)) return;

    this.roles.push(roleToAdd);
  }

  public getProfileType() {
    return this.profileType;
  }

  public removeRole(roleToRemove: Role) {
    if (!this.roles.includes(roleToRemove)) return;

    if (this.roles.length === 1) {
      throw new InvalidSystemAccountState(
        `Account must have at least one role`,
      );
    }
    this.roles = this.roles.filter((role) => role !== roleToRemove);
  }

  public getPassword() {
    return this.password;
  }

  public getUserId() {
    return this.userId;
  }

  // public async changePassword(newPassword: string, confirmPassword: string) {
  //   if (newPassword !== confirmPassword)
  //     throw new PasswordsDoesNotMatchError(`Passwords does not match`);

  //   if (!this.isPasswordValid(newPassword))
  //     throw new InvalidPasswordError(
  //       `Password requires at least one symbol and number`,
  //     );

  //   const hashedPass = await bcrypt.hash(newPassword, 13);

  //   this.password = hashedPass;
  // }

  private isPasswordValid(candidatePassword: string) {
    return /^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(candidatePassword);
  }
}
