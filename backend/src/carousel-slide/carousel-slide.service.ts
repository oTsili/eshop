import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarouselSlideDto } from './dto/create-carouselSlide-document.dto';
import {
  CarouselSlide,
  CarouselSlideDocument,
} from './schemas/carousel-slide.schema';

@Injectable()
export class CarouselSlideService {
  constructor(
    @InjectModel(CarouselSlide.name)
    private carouselSlideModel: Model<CarouselSlideDocument>,
  ) {}

  async create(
    createCarouselSlideDto: CreateCarouselSlideDto,
  ): Promise<CarouselSlide> {
    const createCarouselSlide = new this.carouselSlideModel(
      createCarouselSlideDto,
    );
    return createCarouselSlide.save();
  }

  async findAll(): Promise<CarouselSlide[]> {
    return this.carouselSlideModel.find().exec();
  }
}
