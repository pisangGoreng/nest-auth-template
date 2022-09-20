import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe()); // ! add this if use DTO validation - class transformer
  app.use(cookieParser()); // ! add this to use cookie

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Simple Auth')
      .setDescription('Simple Auth API description')
      .setVersion('1.0')
      .build(),
    {
      include: [UserModule], //the modules that you want to include in your swagger docs
    },
  );
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
