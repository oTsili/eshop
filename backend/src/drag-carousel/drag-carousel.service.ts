import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDragCarouseDto } from './dto/drag-carousel.dto';
import { DragCarousel } from './schemas/drag-carousel.schema';

@Injectable()
export class DragCarouselService {
  constructor(
    @InjectModel(DragCarousel.name)
    private dragCarouselModel: Model<DragCarousel>,
  ) {}

  async create(
    createDragCarouselDto: CreateDragCarouseDto,
  ): Promise<DragCarousel> {
    const createDragCarousel = new this.dragCarouselModel(
      createDragCarouselDto,
    );
    return createDragCarousel.save();
  }

  async findAll(): Promise<DragCarousel[]> {
    return this.dragCarouselModel.find().exec();
  }
}
