import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { Session } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // set glabal request route prefix (e.g. http://localhost:3000/api/<whatever>)
  app.setGlobalPrefix('api');

  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

  app.useStaticAssets(join(__dirname, '..', 'static'));

  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());
  // app.use(cookieParser());

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      // cookie: {
      //   maxAge: parseInt(process.env.MAX_AGE),
      // },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    allowedHeaders:
      'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization',
    credentials: true,
  });

  // this.app.use(validator());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
