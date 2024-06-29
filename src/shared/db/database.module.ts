import { Module } from '@nestjs/common';

import { PG_CONNECTION } from './constant';
import { DatabaseService } from './database.service';
import { Pool } from 'pg';
import { config } from '../env/config';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      useFactory: () => {
        return new Pool({
          connectionString: config.databaseUrl,
        });
      },
    },
    DatabaseService,
  ],
  exports: [PG_CONNECTION, DatabaseService],
})
export class DatabaseModule {}
