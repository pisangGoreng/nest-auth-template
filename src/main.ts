import 'dotenv/config';
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
      include: [UserModule],
      //the modules that you want to include in your swagger docs
    },
  );

  SwaggerModule.setup('api', app, document); // http://localhost:3000/api
  console.log('ce ', process.env);
  await app.listen(process.env.APP_PORT);

  console.log(`Connection to ${process.env.DB_TYPE}`);
  console.log(`Server use ==> ${process.env.NODE_ENV} env`);
  console.log(`Server is running on PORT ==> ${process.env.APP_PORT}`);
}
bootstrap();
