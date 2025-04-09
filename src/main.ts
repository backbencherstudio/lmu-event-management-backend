import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'; 
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
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
