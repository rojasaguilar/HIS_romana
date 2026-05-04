export class RefreshTokenEntity {
  constructor(
    private readonly jti: string,
    private readonly accountId: string,
    //control
    private isRevoked: boolean,
    // private revokedAt: Date,
    //expiracion
    private readonly expiresAt: Date,
    private readonly createdAt: Date,
    private userAgent?: string,
    private replacedByJti?: string,
  ) {}

  public getAccountId() {
    return this.accountId;
  }

  public getJti() {
    return this.jti;
  }

  public getIsRevoked() {
    return this.isRevoked;
  }

  public getExpirationDate() {
    return this.expiresAt;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

//   public getRevokedDate() {
//     return this.revokedAt;
//   }
}
