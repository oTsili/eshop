import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // set glabal request route prefix (e.g. http://localhost:3000/api/<whatever>)
  app.setGlobalPrefix('api');

  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

  app.useStaticAssets(join(__dirname, '..', 'static'));

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    allowedHeaders:
      'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization',
    credentials: true,
  });

  app.use(cookieParser());

  // Cross-site request forgery (also known as CSRF or XSRF) is a type of malicious exploit of a website where unauthorized commands are transmitted from a user that the web application trusts
  app.use(csurf({ cookie: true }));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
