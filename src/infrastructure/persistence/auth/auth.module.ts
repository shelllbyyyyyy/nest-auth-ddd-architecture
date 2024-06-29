import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthPersist } from './repository/auth.persist';
import { UserPersist } from '../postgres/repository/user.persist';

import { config } from '@/shared/env/config';
import { BcryptService } from '@/shared/bcrypt';
import { DatabaseModule } from '@/shared/db/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthPersist,
    UserPersist,
    LocalStrategy,
    JwtStrategy,
    BcryptService,
  ],
  exports: [AuthPersist, UserPersist],
})
export class AuthModule {}
