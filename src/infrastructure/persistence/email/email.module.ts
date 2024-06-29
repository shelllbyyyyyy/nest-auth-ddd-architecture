import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EmailRepository } from '@/domain/repositories/email.repository';
import { config } from '@/shared/env/config';

import { EmailPersist } from './repository/email.persist';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: config.usernameAdmin,
          pass: config.passAdmin,
        },
      },
      defaults: {
        from: `"No Reply" <${config.emailAdmin}>`,
      },
    }),
    JwtModule.register({
      secret: config.jwtSecret,
    }),
  ],
  providers: [
    {
      provide: EmailRepository,
      useClass: EmailPersist,
    },
  ],
  exports: [EmailRepository],
})
export class MailModule {}
