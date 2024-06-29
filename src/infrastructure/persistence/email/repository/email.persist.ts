import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

import { EmailRepository } from '@/domain/repositories/email.repository';
import { config } from '@/shared/env/config';

@Injectable()
export class EmailPersist implements EmailRepository {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

  async generateToken(email: string): Promise<string> {
    return await this.jwtService.signAsync({ email }, { expiresIn: '60s' });
  }

  async sendEmail(email: string, subject: string, body: string): Promise<void> {
    await this.mailService.sendMail({
      from: `By Tukang <${config.emailAdmin}>`,
      to: email,
      subject,
      text: body,
    });
  }

  async validateToken(token: string): Promise<string> {
    const { email } = await this.jwtService.verifyAsync(token);

    return email as string;
  }
}
