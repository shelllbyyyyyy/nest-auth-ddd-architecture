export class User {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
    private readonly verified: boolean,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.verified = verified;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  isVerified(): boolean {
    return this.verified;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updatePassword(newPassword: string): User {
    return new User(
      this.id,
      this.name,
      this.email,
      newPassword,
      this.verified,
      this.createdAt,
      new Date(),
    );
  }

  verifiedUser(verified: boolean): User {
    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      verified,
      this.createdAt,
      new Date(),
    );
  }
}
