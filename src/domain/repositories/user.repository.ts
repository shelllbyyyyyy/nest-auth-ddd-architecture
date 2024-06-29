import { User } from '../models/user.entity';

export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByEmailWithPassword(email: string): Promise<User>;
  abstract updatePassword(data: User): Promise<User>;
  abstract verifiedUser(data: User): Promise<boolean>;
  abstract create(data: User): Promise<User>;
  abstract delete(email: string): Promise<void>;
}
