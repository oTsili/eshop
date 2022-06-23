import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarouselSlideController } from './carousel-slide.controller';
import { CarouselSlideService } from './carousel-slide.service';
import {
  CarouselSlide,
  CarouselSlideSchema,
} from './schemas/carousel-slide.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CarouselSlide.name, schema: CarouselSlideSchema },
    ]),
  ],
  controllers: [CarouselSlideController],
  providers: [CarouselSlideService],
})
export class CarouselSlideModule {}
