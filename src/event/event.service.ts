import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { parseISO, isValid } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class EventService {
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

  async create(createEventDto: CreateEventDto) {
    try {
      const timezone = createEventDto.timezone || 'America/Cayman';
      
      // Validate and parse dates
      const startDateTime = this.validateAndParseDate(createEventDto.startDate, createEventDto.startTime);
      const endDateTime = this.validateAndParseDate(createEventDto.endDate, createEventDto.endTime);

      // Validate that end date is not before start date
      if (endDateTime < startDateTime) {
        throw new BadRequestException('End date/time cannot be before start date/time');
      }

      const event = await this.prisma.event.create({
        data: {
          name: createEventDto.name,
          description: createEventDto.description,
          startDate: startDateTime,
          endDate: endDateTime,
          startTime: createEventDto.startTime,
          endTime: createEventDto.endTime,
          timezone,
        },
      });

      // Convert dates back to the event's timezone for response
      const zonedStartDate = toZonedTime(event.startDate, event.timezone);
      const zonedEndDate = toZonedTime(event.endDate, event.timezone);

      return {
        success: true,
        data: {
          ...event,
          startDate: zonedStartDate,
          endDate: zonedEndDate,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P1001') {
          throw new InternalServerErrorException('Database connection error. Please try again in a few moments.');
        }
      }
      throw new InternalServerErrorException('An error occurred while creating the event');
    }
  }

  async findAll(query: any) {
    const { page = '1', limit = '10', search, startDate, endDate, timezone = 'America/Cayman' } = query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: Prisma.EventWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        startDate && endDate
          ? {
              startDate: {
                gte: this.validateAndParseDate(startDate, '00:00'),
              },
              endDate: {
                lte: this.validateAndParseDate(endDate, '23:59'),
              },
            }
          : {},
      ],
    };

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.event.count({ where }),
    ]);

    // Convert dates to requested timezone for each event
    const eventsWithLocalTime = events.map((event) => ({
      ...event,
      startDate: toZonedTime(event.startDate, event.timezone || timezone),
      endDate: toZonedTime(event.endDate, event.timezone || timezone),
    }));

    return {
      data: eventsWithLocalTime,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Convert dates to event's timezone
    return {
      ...event,
      startDate: toZonedTime(event.startDate, event.timezone),
      endDate: toZonedTime(event.endDate, event.timezone),
    };
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const updateData: any = { ...updateEventDto };
    const timezone = updateEventDto.timezone || event.timezone;

    // Validate and update dates if provided
    if (updateEventDto.startDate) {
      updateData.startDate = this.validateAndParseDate(
        updateEventDto.startDate,
        updateEventDto.startTime || event.startTime
      );
    }
    if (updateEventDto.endDate) {
      updateData.endDate = this.validateAndParseDate(
        updateEventDto.endDate,
        updateEventDto.endTime || event.endTime
      );
    }

    // Validate that end date is not before start date
    const finalStartDate = updateData.startDate || event.startDate;
    const finalEndDate = updateData.endDate || event.endDate;
    if (finalEndDate < finalStartDate) {
      throw new BadRequestException('End date/time cannot be before start date/time');
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: updateData,
    });

    return {
      ...updatedEvent,
      startDate: toZonedTime(updatedEvent.startDate, updatedEvent.timezone),
      endDate: toZonedTime(updatedEvent.endDate, updatedEvent.timezone),
    };
  }

  async remove(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.prisma.event.delete({
      where: { id },
    });

    return { success: true, message: 'Event deleted successfully' };
  }
}
