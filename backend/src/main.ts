import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // set glabal request route prefix (e.g. http://localhost:3000/api/<whatever>)
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    allowedHeaders:
      'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
