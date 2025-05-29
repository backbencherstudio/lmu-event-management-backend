import { IsNotEmpty, IsString, IsDateString, Matches } from 'class-validator';

export class CreateEventRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in 24-hour format (HH:mm), e.g., 13:30',
  })
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'End time must be in 24-hour format (HH:mm), e.g., 15:30',
  })
  endTime: string;
}
