import { User } from '@/domain/models/user.entity';

export class UserMapper {
  static toDomain(row: any): User {
    if (!row) return;

    return new User(
      row.id,
      row.name,
      row.email,
      undefined,
      row.verified,
      row.createdAt,
      row.updatedAt,
    );
  }

  static toDomainWithPassword(row: any): User {
    if (!row) return;

    return new User(
      row.id,
      row.name,
      row.email,
      row.password,
      row.verified,
      row.createdAt,
      row.updatedAt,
    );
  }

  static toDomains(rows: any[]): User[] {
    if (!rows) return;

    return rows.map((row: any) => this.toDomain(row));
  }
}
