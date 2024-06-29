import { Injectable } from '@nestjs/common';

import { User } from '@/domain/models/user.entity';
import { UserRepository } from '@/domain/repositories/user.repository';
import { ResetPasswordService } from '@/domain/services/reset-password.service';

import { VerificationUserService } from '@/domain/services/verification-user.service';

import { BcryptService } from '@/shared/bcrypt';
import { EmailRepository } from '@/domain/repositories/email.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userRepository: UserRepository,
    private readonly emailRepository: EmailRepository,
    private readonly passwordService: ResetPasswordService,
    private readonly verificationUserService: VerificationUserService,
  ) {}

  async findMany(): Promise<User[]> {
    return await this.userRepository.findMany();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async delete(email: string): Promise<void> {
    return await this.userRepository.delete(email);
  }

  async initiateResetPassword(email: string): Promise<void> {
    const token = await this.emailRepository.generateToken(email);

    await this.passwordService.initiatePasswordReset(email, token);
  }

  async updatePassword(newPassword: string, token: string): Promise<User> {
    const hashedPassword = await this.bcryptService.hashPassword(newPassword);
    const verifyToken = await this.emailRepository.validateToken(token);

    return await this.passwordService.resetPassword(
      hashedPassword,
      verifyToken,
    );
  }

  async initiateVerifyUser(email: string): Promise<void> {
    const token = await this.emailRepository.generateToken(email);

    await this.verificationUserService.initiateVerifyUser(email, token);
  }

  async verifiedUser(token: string): Promise<boolean> {
    const email = await this.emailRepository.validateToken(token);

    return await this.verificationUserService.verifyUser(email);
  }
}
