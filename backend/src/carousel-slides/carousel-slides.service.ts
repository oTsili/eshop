import { Injectable } from '@nestjs/common';
import { CarouselSlide } from './schemas/carousel-slides.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarouselSlideDto } from './dto/create-carousel-slide.dto';
import { UpdateCarouselSlideDto } from './dto/update-carousel-slide.dto';

@Injectable()
export class CarouselSlidesService {
  constructor(
    @InjectModel(CarouselSlide.name)
    private carouselSlideModel: Model<CarouselSlide>,
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

  async findById(id: string): Promise<CarouselSlide> {
    return this.carouselSlideModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCarouselSlideDto: UpdateCarouselSlideDto,
  ): Promise<CarouselSlide> {
    let toUpdate = await this.carouselSlideModel.findById(id);

    let updated = Object.assign(toUpdate, updateCarouselSlideDto);

    return await updated.save();
  }
}
