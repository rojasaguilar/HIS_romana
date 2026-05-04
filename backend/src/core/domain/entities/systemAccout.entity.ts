import { InvalidSystemAccountState } from '../errors/account.error';
import { Role } from '../types/role.type';

export class SystemAccount {
  constructor(
    private readonly userId: string,
    public email: string,
    public roles: Role[],
    private password: string,
    private profileType: 'MEDIC' | 'RECEPSIONIST',
    private readonly accountId?: string,
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

  public getAccountId() {
    return this.accountId;
  }

  public getUserId() {
    return this.userId;
  }

  private isPasswordValid(candidatePassword: string) {
    return /^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(candidatePassword);
  }
}
