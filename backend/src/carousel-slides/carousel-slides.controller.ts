import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CarouselSlidesService } from './carousel-slides.service';
import { CarouselSlide } from './schemas/carousel-slides.schema';

@Controller('carousel-slides')
export class CarouselSlidesController {
  constructor(private readonly carouselSlidesService: CarouselSlidesService) {}

  @Post()
  async createCarouselSlides(
    @Res() response,
    @Body() carouselSlide: CarouselSlide,
  ) {
    const newCarouselSlide = await this.carouselSlidesService.create(
      carouselSlide,
    );
    return response.status(HttpStatus.CREATED).json({
      newCarouselSlide,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const carouselSlides = await this.carouselSlidesService.findAll();
    return response.status(HttpStatus.OK).json({
      carouselSlides,
    });
  }
}
