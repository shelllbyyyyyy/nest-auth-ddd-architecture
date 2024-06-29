import { Injectable } from '@nestjs/common';

import { EmailRepository } from '../repositories/email.repository';

@Injectable()
export class MailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendEmailForgotPassword(
    email: string,
    subject: string,
    body: string,
  ): Promise<void> {
    return await this.emailRepository.sendEmail(email, subject, body);
  }

  async sendEmailVerificationUser(
    email: string,
    subject: string,
    body: any,
  ): Promise<void> {
    return await this.emailRepository.sendEmail(email, subject, body);
  }
}
