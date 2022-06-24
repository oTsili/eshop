import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGridCategoriesDto } from './dto/grid-categories.dto';
import { GridCategories } from './schemas/grid-categories.schema';

@Injectable()
export class GridCategoriesService {
  constructor(
    @InjectModel(GridCategories.name)
    private gridCategoriesModel: Model<GridCategories>,
  ) {}

  async create(
    createGridCategoriesDto: CreateGridCategoriesDto,
  ): Promise<GridCategories> {
    const createGridCategories = new this.gridCategoriesModel(
      createGridCategoriesDto,
    );
    return createGridCategories.save();
  }

  async findAll(): Promise<GridCategories[]> {
    return this.gridCategoriesModel.find().exec();
  }
}
