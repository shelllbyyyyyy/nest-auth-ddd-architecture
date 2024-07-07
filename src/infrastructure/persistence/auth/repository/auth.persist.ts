import { User } from '@/domain/models/user.entity';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import { UserPersist } from '../../postgres/repository/user.persist';

import { BcryptService } from '@/shared/bcrypt';

@Injectable()
export class AuthPersist {
  constructor(
    private readonly userPersist: UserPersist,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUserCredential(email, password);

    const payload = { name: user.getName(), sub: user.getId() };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserCredential(email: string, password: string): Promise<User> {
    const user = await this.userPersist.findByEmailWithPassword(email);

    if (!user) throw new UnprocessableEntityException('User not found ...!');

    const dbPassword = user.getPassword();

    const compare = await this.bcryptService.comparePassword(
      password,
      dbPassword,
    );

    if (!compare) throw new UnauthorizedException('Password not match ...!');

    return user;
  }

  async register(
    name: string,
    email: string,
    password: string,
    retryPassword: string,
  ): Promise<User> {
    const user = await this.userPersist.findByEmail(email);
    if (user)
      throw new UnprocessableEntityException(
        'email has already been registered',
      );

    if (retryPassword !== password)
      throw new UnprocessableEntityException('Password not match');

    const id = uuidv4();
    const hashedPassword = await this.bcryptService.hashPassword(password);
    const verified = false;
    const createdAt = new Date();

    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
      verified,
      createdAt,
    );

    await this.userPersist.create(newUser);

    return newUser;
  }
}
