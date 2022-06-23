import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CarouselSlideModule } from './carousel-slide/carousel-slide.module';

@Module({
  // connect to the demo Database
  imports: [
    MongooseModule.forRoot(
      `${process.env['ME_CONFIG_MONGODB_URL']}/eshop?authSource=admin`,
    ),
    ProductsModule,
    CarouselSlideModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
