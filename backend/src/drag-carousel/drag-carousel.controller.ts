import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { DragCarouselService } from './drag-carousel.service';
import { DragCarousel } from './schemas/drag-carousel.schema';

@Controller('drag-carousel')
export class DragCarouselController {
  constructor(private readonly dragCarouselService: DragCarouselService) {}

  @Post()
  async createDragCarousel(
    @Res() response,
    @Body() dragCarousel: DragCarousel,
  ) {
    const newDragCarousel = await this.dragCarouselService.create(dragCarousel);

    return response.status(HttpStatus.CREATED).json({
      newDragCarousel,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const dragCarousel = await this.dragCarouselService.findAll();
    return response.status(HttpStatus.OK).json({
      dragCarousel,
    });
  }
}
