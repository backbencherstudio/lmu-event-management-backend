import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { EventModule } from './event/event.module';
import { EventRequestModule } from './event-request/event-request.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    SubscriptionModule,
    EventModule,
    EventRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
