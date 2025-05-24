import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    // Parse the dates and convert to UTC
    const startDate = parseISO(createEventDto.startDate);
    const endDate = parseISO(createEventDto.endDate);

    const event = await this.prisma.event.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        startDate,
        endDate,
        startTime: createEventDto.startTime,
        endTime: createEventDto.endTime,
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

  // event.service.ts
  async findAll(query: any) {
    const { page = '1', limit = '10', search, startDate, endDate } = query;

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
                gte: new Date(startDate),
              },
              endDate: {
                lte: new Date(endDate),
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

    // Convert dates to Cayman timezone for each event
    const eventsWithLocalTime = events.map((event) => ({
      ...event,
      startDate: toZonedTime(event.startDate, 'America/Cayman'),
      endDate: toZonedTime(event.endDate, 'America/Cayman'),
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

    // Convert dates to Cayman timezone
    return {
      ...event,
      startDate: toZonedTime(event.startDate, 'America/Cayman'),
      endDate: toZonedTime(event.endDate, 'America/Cayman'),
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

    // Only convert dates if they are provided
    if (updateEventDto.startDate) {
      updateData.startDate = new Date(updateEventDto.startDate);
    }
    if (updateEventDto.endDate) {
      updateData.endDate = new Date(updateEventDto.endDate);
    }

    return this.prisma.event.update({
      where: { id },
      data: updateData,
    });
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
