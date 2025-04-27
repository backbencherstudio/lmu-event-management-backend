import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'; 
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://192.168.4.31:3000',
        'http://192.168.4.31:*',
        'http://192.168.4.31:3001',
        'http://192.168.4.31:3002',
        'http://192.168.4.31:3003',
        'http://192.168.4.31:3004',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'https://lmu-event-management-frontend.vercel.app',
        'https://lmu-event-management-frontend-akuy6y82z-bbsfullstacks-projects.vercel.app'
      ],
      credentials: true,
    },
  });
  const port = process.env.PORT || 3002;
  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      return new BadRequestException({
        success: false,
        message: errors.map(error => Object.values(error?.constraints as object)).flat()[0],
        statusCode: 400,
        error: 'Bad Request'
      });
    }
  }));
  await app.listen(port);
}

bootstrap();
