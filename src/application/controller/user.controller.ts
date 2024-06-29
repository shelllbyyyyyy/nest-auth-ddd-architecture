import { Controller, Delete, Get, Param, HttpStatus } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { ApiResponse } from '../dtos/api-response.dto';
import { User } from '@/domain/models/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findMany(): Promise<ApiResponse<User[]>> {
    const data = await this.userService.findMany();

    return new ApiResponse(HttpStatus.OK, 'Ok', data);
  }

  @Get('/:email')
  async findByEmail(@Param('email') email: string): Promise<ApiResponse<User>> {
    const data = await this.userService.findByEmail(email);

    return new ApiResponse(HttpStatus.OK, 'Account found', data);
  }

  @Delete('/:email')
  async delete(@Param('email') email: string): Promise<ApiResponse<any>> {
    const data = await this.userService.delete(email);

    return new ApiResponse(
      HttpStatus.NO_CONTENT,
      'Account has been deleted',
      data,
    );
  }
}
