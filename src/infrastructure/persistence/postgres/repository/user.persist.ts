import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { User } from '@/domain/models/user.entity';
import { UserRepository } from '@/domain/repositories/user.repository';

import { UserMapper } from '@/infrastructure/persistence/postgres/mapper/user-mapper';

import { DatabaseService } from '@/shared/db/database.service';

@Injectable()
export class UserPersist implements UserRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(data: User): Promise<User> {
    const name = data.getName();
    const email = data.getEmail();
    const password = data.getPassword();

    const query = `INSERT INTO users (name, email, password)
                   VALUES ($1, $2, $3)
                   RETURNING *;`;

    const result = await this.db.query(query, [name, email, password]);

    return UserMapper.toDomain(result[0]);
  }

  async findMany(): Promise<User[]> {
    const query = 'SELECT * FROM users';

    const result = await this.db.query(query, []);

    if (result.length == 0) {
      throw new UnprocessableEntityException('User not found');
    }

    return UserMapper.toDomains(result);
  }

  async findByEmail(email: string): Promise<User> {
    const query = `SELECT id, name, email, verified, "createdAt", "updatedAt" FROM users WHERE email = $1;`;

    const result = await this.db.query(query, [email]);

    return UserMapper.toDomain(result[0]);
  }

  async findByEmailWithPassword(email: string): Promise<User> {
    const query = `SELECT * FROM users WHERE email = $1;`;

    const result = await this.db.query(query, [email]);

    return UserMapper.toDomainWithPassword(result[0]);
  }

  async delete(email: string): Promise<void> {
    const query = 'DELETE FROM users WHERE email = $1;';
    await this.db.query(query, [email]);
  }

  async updatePassword(data: User): Promise<User> {
    const password = data.getPassword();
    const updatedAt = data.getUpdatedAt();
    const email = data.getEmail();

    const query = `UPDATE users SET password = $1, "updatedAt" = $2 WHERE email = $3;`;
    const result = await this.db.query(query, [password, updatedAt, email]);

    return UserMapper.toDomain(result[0]);
  }

  async verifiedUser(data: User): Promise<boolean> {
    const verified = data.isVerified();
    const updatedAt = data.getUpdatedAt();
    const email = data.getEmail();

    const query = `UPDATE users SET verified = $1, "updatedAt" = $2 WHERE email = $3;`;
    await this.db.query(query, [verified, updatedAt, email]);

    return true;
  }
}
