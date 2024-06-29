import { Injectable } from '@nestjs/common';

import { compare, hash } from 'bcrypt';
import { config } from '../env/config';

@Injectable()
export class BcryptService {
  constructor() {}

  async hashPassword(password: string): Promise<string> {
    return await hash(password, config.getSaltRounds);
  }

  async comparePassword(
    inputPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    return await compare(inputPassword, dbPassword);
  }
}
