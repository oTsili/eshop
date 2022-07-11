import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateColorsDto } from './dto/colors.dto';
import { Colors, ColorsDocument } from './schemas/colors.schema';

@Injectable()
export class ColorsService {
  constructor(
    @InjectModel(Colors.name) private colorsModel: Model<ColorsDocument>,
  ) {}

  async createArray(createColorsDto: CreateColorsDto): Promise<Colors> {
    const createColors = new this.colorsModel(createColorsDto);
    return createColors.save();
  }

  async updateArray(
    id: Types.ObjectId,
    colors: Colors,
  ): Promise<ColorsDocument> {
    const updatedColors = await this.colorsModel.findByIdAndUpdate(id, colors, {
      new: true,
    });

    return updatedColors;
  }

  async findAll(): Promise<Colors> {
    return this.colorsModel.findOne().exec();
  }
}
