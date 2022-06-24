import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ProductsModule } from './products/products.module';
import { CarouselSlidesModule } from './carousel-slides/carousel-slides.module';
import { NavbarModule } from './navbar/navbar.module';
import { DragCarouselModule } from './drag-carousel/drag-carousel.module';

@Module({
  // connect to the demo Database
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MongooseModule.forRoot(
      `${process.env['ME_CONFIG_MONGODB_URL']}/eshop?authSource=admin`,
    ),
    ProductsModule,
    CarouselSlidesModule,
    NavbarModule,
    DragCarouselModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
