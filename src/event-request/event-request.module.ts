import { Module } from '@nestjs/common';
import { EventRequestController } from './event-request.controller';
import { EventRequestService } from './event-request.service';

@Module({
  controllers: [EventRequestController],
  providers: [EventRequestService],
})
export class EventRequestModule {}
