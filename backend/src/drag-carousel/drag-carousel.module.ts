import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DragCarouselController } from './drag-carousel.controller';
import { DragCarouselService } from './drag-carousel.service';
import {
  DragCarousel,
  DragCarouselSchema,
} from './schemas/drag-carousel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DragCarousel.name, schema: DragCarouselSchema },
    ]),
  ],
  controllers: [DragCarouselController],
  providers: [DragCarouselService],
})
export class DragCarouselModule {}
