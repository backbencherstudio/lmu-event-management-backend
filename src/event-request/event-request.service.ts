import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventRequestDto } from './dto/create-event-request.dto';
import { parseISO, isValid } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Prisma, Status } from '@prisma/client';
import sendEmail from '../utils/email.util';
import { EventRequestConfirmation } from '../utils/email-templates';

@Injectable()
export class EventRequestService {
  constructor(private prisma: PrismaService) {}

  private validateAndParseDate(dateStr: string, timeStr: string): Date {
    try {
      const date = parseISO(`${dateStr}T${timeStr}:00`);
      if (!isValid(date)) {
        throw new BadRequestException(`Invalid date or time: ${dateStr} ${timeStr}`);
      }
      return date;
    } catch (error) {
      throw new BadRequestException(`Invalid date or time format: ${dateStr} ${timeStr}`);
    }
  }

  async create(createEventRequestDto: CreateEventRequestDto) {
    try {
      // Validate and parse dates
      const startDateTime = this.validateAndParseDate(createEventRequestDto.startDate, createEventRequestDto.startTime);
      const endDateTime = this.validateAndParseDate(createEventRequestDto.endDate, createEventRequestDto.endTime);

      // Validate that end date is not before start date
      if (endDateTime < startDateTime) {
        throw new BadRequestException('End date/time cannot be before start date/time');
      }

      const eventRequest = await this.prisma.event_request.create({
        data: {
          ...createEventRequestDto,
          startDate: startDateTime,
          endDate: endDateTime,
          status: 'PENDING',
        },
      });

      // Send email asynchronously without waiting
      sendEmail(
        createEventRequestDto.email,
        'Event Request Confirmation',
        EventRequestConfirmation(createEventRequestDto),
      );

      return {
        success: true,
        data: {
          ...eventRequest,
          startDate: toZonedTime(eventRequest.startDate, 'America/Cayman'),
          endDate: toZonedTime(eventRequest.endDate, 'America/Cayman'),
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('An error occurred while creating the event request');
    }
  }

  async findAll(query: { page?: number; limit?: number; status?: Status }) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.Event_requestWhereInput = {
      ...(status && { status }),
    };

    const [eventRequests, total] = await Promise.all([
      this.prisma.event_request.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.event_request.count({ where }),
    ]);

    return {
      data: eventRequests.map((request) => ({
        ...request,
        startDate: toZonedTime(request.startDate, 'America/Cayman'),
        endDate: toZonedTime(request.endDate, 'America/Cayman'),
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
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