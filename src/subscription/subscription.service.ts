import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionQueryDto } from './dto/subscription-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const existingSubscription = await this.prisma.subscription.findUnique({
      where: { email: createSubscriptionDto.email },
    });

    if (existingSubscription) {
      throw new ConflictException('Email already subscribed');
    }

    return this.prisma.subscription.create({
      data: createSubscriptionDto,
    });
  }

  // async findAll() {
  //   console.log('findAll');

  //   const subscriptions = await this.prisma.subscription.findMany({
  //     orderBy: { createdAt: 'desc' },
  //   });

  //   console.log(subscriptions);

  //   return subscriptions;
  // }

  // GET /subscriptions?page=1&limit=10&search=someSearchTerm&startDate=2025-01-01&endDate=2025-12-31

  async findAll(query: SubscriptionQueryDto) {
    const { page = 1, limit = 10, search, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.SubscriptionWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { companyName: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        startDate && endDate
          ? {
              createdAt: {
                gte: new Date(startDate),
                lte: new Date(endDate),
              },
            }
          : {},
      ],
    };

    const [subscriptions, total] = await Promise.all([
      this.prisma.subscription.findMany({
        where: where,
        skip: skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.subscription.count({
        where: where,
      }),
    ]);

    return {
      data: subscriptions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async delete(id: number) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    await this.prisma.subscription.delete({
      where: { id },
    });

    return { message: 'Subscription deleted successfully' };
  }
}
