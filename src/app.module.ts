import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { ControllerModule } from '@/application/controller/controlller.module';

@Module({
  imports: [
    PersistenceModule.register({
      global: true,
    }),
    ControllerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
