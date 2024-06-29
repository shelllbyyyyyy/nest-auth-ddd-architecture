import { DynamicModule, Module } from '@nestjs/common';
import { PostgresModule } from './postgres/postgres.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './email/email.module';

interface DatabaseOptions {
  global?: boolean;
}

@Module({})
export class PersistenceModule {
  static async register({
    global = false,
  }: DatabaseOptions): Promise<DynamicModule> {
    return {
      global,
      module: PersistenceModule,
      imports: [PostgresModule, AuthModule, MailModule],
      exports: [PostgresModule, AuthModule, MailModule],
    };
  }
}
