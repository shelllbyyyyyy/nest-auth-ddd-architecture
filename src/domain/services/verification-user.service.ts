import { Injectable } from '@nestjs/common';

import { MailService } from '../events/send-email.event';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class VerificationUserService {
  constructor(
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
  ) {}

  async initiateVerifyUser(email: string, token: string): Promise<void> {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) throw new Error('users not found ...!');

    await this.sendVerificationEmail(user.getEmail(), token);
  }

  async verifyUser(token: string): Promise<boolean> {
    const user = await this.userRepository.findByEmailWithPassword(token);

    const verified = user.verifiedUser(true);
    await this.userRepository.verifiedUser(verified);

    return true;
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verifyLink = `https://by-tukang.mangaip.online/verify-user?token=${token}`;
    const subject = 'Verification User';
    const body = `Dear user,\n\nPlease click on the following link to verify your account:\n${verifyLink} .`;

    return await this.mailService.sendEmailVerificationUser(
      email,
      subject,
      body,
    );
  }
}
