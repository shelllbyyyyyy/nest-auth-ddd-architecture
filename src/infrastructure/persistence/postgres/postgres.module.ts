import { UserRepository } from '@/domain/repositories/user.repository';
import { Module } from '@nestjs/common';
import { UserPersist } from './repository/user.persist';
import { DatabaseModule } from '@/shared/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPersist,
    },
  ],
  exports: [UserRepository],
})
export class PostgresModule {}
