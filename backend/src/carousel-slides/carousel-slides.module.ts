import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CarouselSlidesController } from './carousel-slides.controller';
import { CarouselSlidesService } from './carousel-slides.service';
import {
  CarouselSlide,
  CarouselSlideSchema,
} from './schemas/carousel-slides.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CarouselSlide.name, schema: CarouselSlideSchema },
    ]),
  ],
  controllers: [CarouselSlidesController],
  providers: [CarouselSlidesService],
})
export class CarouselSlidesModule {}
