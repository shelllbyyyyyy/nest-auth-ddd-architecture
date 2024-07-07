import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from '@/application/services/user.service';

import { User } from '@/domain/models/user.entity';

import { LocalAuthGuard } from '@/infrastructure/persistence/auth/guards/local-auth.guard';
import { AuthPersist } from '@/infrastructure/persistence/auth/repository/auth.persist';

import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { ApiResponse } from '../dtos/api-response.dto';
import { ResetPasswordDTO } from '../dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthPersist,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDTO: LoginDTO): Promise<ApiResponse<any>> {
    const { email, password } = loginDTO;
    const token = await this.authService.login(email, password);

    return new ApiResponse(HttpStatus.OK, 'Login successful', token);
  }

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO): Promise<ApiResponse<User>> {
    const { name, email, password, retryPassword } = registerDTO;
    const newUser = await this.authService.register(
      name,
      email,
      password,
      retryPassword,
    );

    return new ApiResponse(HttpStatus.CREATED, 'Register successful', newUser);
  }

  @Post('/forgot-password/:email')
  async forgotPassword(
    @Param('email') email: string,
  ): Promise<ApiResponse<void>> {
    const data = await this.userService.initiateResetPassword(email);

    return new ApiResponse(
      HttpStatus.OK,
      'Reset password link has been sent to your email',
      data,
    );
  }

  @Post('/reset-password/:token')
  async resetPassword(
    @Body() resetPasswordDTO: ResetPasswordDTO,
    @Param('token') token: string,
  ): Promise<ApiResponse<User>> {
    const data = await this.userService.updatePassword(
      resetPasswordDTO.password,
      token,
    );

    return new ApiResponse(
      HttpStatus.OK,
      'Password reset has been  successfully',
      data,
    );
  }

  @Post('/verify-user/:email')
  async initiateVerifyUser(
    @Param('email') email: string,
  ): Promise<ApiResponse<void>> {
    const data = await this.userService.initiateVerifyUser(email);

    return new ApiResponse(
      HttpStatus.OK,
      'Link verification has been sent to your email',
      data,
    );
  }

  @Post('/verified-user/:token')
  async verifyUser(
    @Param('token') token: string,
  ): Promise<ApiResponse<boolean>> {
    const data = await this.userService.verifiedUser(token);

    return new ApiResponse(HttpStatus.OK, 'User has been verified', data);
  }
}
