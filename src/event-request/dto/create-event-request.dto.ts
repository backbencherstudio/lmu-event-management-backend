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
  @Matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/, {
    message: 'Start time must be in format: HH:MM AM/PM',
  })
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/, {
    message: 'End time must be in format: HH:MM AM/PM',
  })
  endTime: string;
}
