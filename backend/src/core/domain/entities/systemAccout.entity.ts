import { Role } from '../types/role.type';

export class SystemAccount {
  constructor(
    public readonly id: string,
    public email: string,
    public roles: Role[],
  ) {}

  public hasRole(requiredRole: Role) {
    return this.roles.includes(requiredRole);
  }

  public addRole(roleToAdd: Role) {
    this.roles.push(roleToAdd);
  }
}
