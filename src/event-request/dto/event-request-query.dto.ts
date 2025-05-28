import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Status } from '@prisma/client';
import { Type } from 'class-transformer';

export class EventRequestQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsEnum(Status, { each: true })
  status?: Status | Status[];
}
