import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventRequestDto } from './dto/create-event-request.dto';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class EventRequestService {
  constructor(private prisma: PrismaService) {}

  async create(createEventRequestDto: CreateEventRequestDto) {
    const startDate = parseISO(createEventRequestDto.startDate);
    const endDate = parseISO(createEventRequestDto.endDate);

    const eventRequest = await this.prisma.event_request.create({
      data: {
        ...createEventRequestDto,
        startDate,
        endDate,
        status: 'PENDING',
      },
    });

    return {
      success: true,
      data: {
        ...eventRequest,
        startDate: toZonedTime(eventRequest.startDate, 'America/Cayman'),
        endDate: toZonedTime(eventRequest.endDate, 'America/Cayman'),
      },
    };
  }

  async findAll() {
    const eventRequests = await this.prisma.event_request.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: eventRequests.map(request => ({
        ...request,
        startDate: toZonedTime(request.startDate, 'America/Cayman'),
        endDate: toZonedTime(request.endDate, 'America/Cayman'),
      })),
    };
  }

  async approve(id: number) {
    const eventRequest = await this.prisma.event_request.findUnique({
      where: { id },
    });

    if (!eventRequest) {
      throw new NotFoundException('Event request not found');
    }

    // First update the event request status
    await this.prisma.event_request.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    // Then create a new event
    const event = await this.prisma.event.create({
      data: {
        name: eventRequest.name,
        description: eventRequest.description,
        startDate: eventRequest.startDate,
        endDate: eventRequest.endDate,
        startTime: eventRequest.startTime,
        endTime: eventRequest.endTime,
        timezone: 'America/Cayman',
      },
    });

    return {
      success: true,
      data: {
        ...event,
        startDate: toZonedTime(event.startDate, 'America/Cayman'),
        endDate: toZonedTime(event.endDate, 'America/Cayman'),
      },
    };
  }

  async reject(id: number) {
    const eventRequest = await this.prisma.event_request.findUnique({
      where: { id },
    });

    if (!eventRequest) {
      throw new NotFoundException('Event request not found');
    }

    await this.prisma.event_request.update({
      where: { id },
      data: { status: 'REJECTED' },
    });

    return {
      success: true,
      message: 'Event request rejected successfully',
    };
  }

  async remove(id: number) {
    const eventRequest = await this.prisma.event_request.findUnique({
      where: { id },
    });

    if (!eventRequest) {
      throw new NotFoundException('Event request not found');
    }

    await this.prisma.event_request.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Event request deleted successfully',
    };
  }
}