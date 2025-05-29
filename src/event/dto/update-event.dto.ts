import { IsOptional, IsString, IsDateString, Matches } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in 24-hour format (HH:mm), e.g., 13:30',
  })
  startTime?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'End time must be in 24-hour format (HH:mm), e.g., 15:30',
  })
  endTime?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}
