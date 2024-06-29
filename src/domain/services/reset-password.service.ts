import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.entity';
import { MailService } from '../events/send-email.event';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
  ) {}

  async initiatePasswordReset(email: string, token: string): Promise<void> {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) throw new Error('users not found ...!');

    await this.sendPasswordResetEmail(user.getEmail(), token);
  }

  async resetPassword(newPassword: string, verifyToken: string): Promise<User> {
    const user = await this.userRepository.findByEmail(verifyToken);
    const updatePassword = user.updatePassword(newPassword);

    await this.userRepository.updatePassword(updatePassword);

    return updatePassword;
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetLink = `https://by-tukang.mangaip.online/reset-password?token=${token}`;
    const subject = 'Password Reset Request';
    const body = `Dear user,\n\nPlease click on the following link to reset your password:\n${resetLink}\n\nIf you did not request this, please ignore this email.`;

    try {
      await this.mailService.sendEmailForgotPassword(email, subject, body);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }
}
