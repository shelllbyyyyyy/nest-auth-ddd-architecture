import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { AuthController } from './auth.controller';

import { MailService } from '@/domain/events/send-email.event';
import { ResetPasswordService } from '@/domain/services/reset-password.service';
import { VerificationUserService } from '@/domain/services/verification-user.service';
import { BcryptService } from '@/shared/bcrypt';
import { AuthModule } from '@/infrastructure/persistence/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    BcryptService,
    ResetPasswordService,
    MailService,
    VerificationUserService,
  ],
})
export class ControllerModule {}
