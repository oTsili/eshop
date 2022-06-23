import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { CarouselSlideService } from './carousel-slide.service';
import { CarouselSlide } from './schemas/carousel-slide.schema';

@Controller('carousel-slide')
export class CarouselSlideController {
  constructor(private readonly carouselSlideService: CarouselSlideService) {}

  @Post()
  async createCarouselSlide(
    @Res() response,
    @Body() carouselSlide: CarouselSlide,
  ) {
    const newCarouselSlide = await this.carouselSlideService.create(
      carouselSlide,
    );
    return response(HttpStatus.CREATED).json({
      newCarouselSlide,
    });
  }
}
