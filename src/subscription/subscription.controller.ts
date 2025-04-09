import { Controller, Post, Get, Delete, Body, Query, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionQueryDto } from './dto/subscription-query.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // findAll() {
  //   return this.subscriptionService.findAll();
  // }
  
  @Get()
@UseGuards(JwtAuthGuard)
findAll(@Query() query: SubscriptionQueryDto) {
  return this.subscriptionService.findAll(query);
}


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.delete(id);
  }
}