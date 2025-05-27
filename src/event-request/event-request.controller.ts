import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe, Delete, Query } from '@nestjs/common';
import { EventRequestService } from './event-request.service';
import { CreateEventRequestDto } from './dto/create-event-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EventRequestQueryDto } from './dto/event-request-query.dto';

@Controller('event-request')
export class EventRequestController {
  constructor(private readonly eventRequestService: EventRequestService) {}

  @Post()
  create(@Body() createEventRequestDto: CreateEventRequestDto) {
    return this.eventRequestService.create(createEventRequestDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: EventRequestQueryDto) {
    return this.eventRequestService.findAll(query);
  }

  @Post(':id/approve')
  @UseGuards(JwtAuthGuard)
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.eventRequestService.approve(id);
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard)
  reject(@Param('id', ParseIntPipe) id: number) {
    return this.eventRequestService.reject(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventRequestService.remove(id);
  }
}