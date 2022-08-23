import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDirectoryColorDto } from './dto/create-directory-color.dto';
import { CreateDirectorySeasonDto } from './dto/create-directory-season.dto';
import { CreateDirectorySizeDto } from './dto/create-directory-size.dto';
import { CreateDirectoryStyleDto } from './dto/create-directory-style.dto';
import { CreateDirectoryTypeDto } from './dto/create-directory-type.dto';

import {
  DirectoryColor,
  DirectoryColorDocument,
} from './schemas/directory-color.schema';
import {
  DirectorySeason,
  DirectorySeasonDocument,
} from './schemas/directory-season.schema';
import {
  DirectorySize,
  DirectorySizeDocument,
} from './schemas/directory-size.schema';
import {
  DirectoryStyle,
  DirectoryStyleDocument,
} from './schemas/directory-style.schema';
import {
  DirectoryType,
  DirectoryTypeDocument,
} from './schemas/directory-type.schema';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductTradeNumberService {
  constructor(
    @InjectModel(DirectoryStyle.name)
    private directoryStyleModel: Model<DirectoryStyleDocument>,
    @InjectModel(DirectoryColor.name)
    private directoryColorModel: Model<DirectoryColorDocument>,
    @InjectModel(DirectoryType.name)
    private directoryTypeModel: Model<DirectoryTypeDocument>,
    @InjectModel(DirectorySize.name)
    private directorySizeModel: Model<DirectorySizeDocument>,
    @InjectModel(DirectorySeason.name)
    private directorySeasonModel: Model<DirectorySeasonDocument>,
  ) {}

  /*************  Create   *************/

  async createDirectoryStyle(directoryDto: CreateDirectoryStyleDto[]) {
    return this.directoryStyleModel.create(directoryDto);
  }

  async createDirectoryColor(directoryDto: CreateDirectoryColorDto[]) {
    return this.directoryColorModel.create(directoryDto);
  }

  async createDirectorySize(directoryDto: CreateDirectorySizeDto[]) {
    return this.directorySizeModel.create(directoryDto);
  }

  async createDirectoryType(directoryDto: CreateDirectoryTypeDto[]) {
    return this.directoryTypeModel.create(directoryDto);
  }

  async createDirectorySeason(directoryDto: CreateDirectorySeasonDto[]) {
    return this.directorySeasonModel.create(directoryDto);
  }

  /*************  Update   *************/

  async updateDirectoryStyle(
    id: string,
    directoryDto: CreateDirectoryStyleDto[],
  ) {
    return this.directoryStyleModel.findByIdAndUpdate(id, directoryDto);
  }

  async updateDirectoryColor(
    id: string,
    directoryDto: CreateDirectoryColorDto[],
  ) {
    return this.directoryColorModel.findByIdAndUpdate(id, directoryDto);
  }

  async updateDirectorySize(
    id: string,
    directoryDto: CreateDirectorySizeDto[],
  ) {
    return this.directorySizeModel.findByIdAndUpdate(id, directoryDto);
  }

  async updateDirectoryType(
    id: string,
    directoryDto: CreateDirectoryTypeDto[],
  ) {
    return this.directoryTypeModel.findByIdAndUpdate(id, directoryDto);
  }

  async updateDirectorySeason(
    id: string,
    directoryDto: CreateDirectorySeasonDto[],
  ) {
    return this.directorySeasonModel.findByIdAndUpdate(id, directoryDto);
  }
  /*************  Delete   *************/

  async deleteDirectoryStyle(directoryDto: CreateDirectoryStyleDto[]) {
    return this.directoryStyleModel.findByIdAndDelete(directoryDto);
  }

  async deleteDirectoryColor(directoryDto: CreateDirectoryColorDto[]) {
    return this.directoryColorModel.findByIdAndDelete(directoryDto);
  }

  async deleteDirectorySize(directoryDto: CreateDirectorySizeDto[]) {
    return this.directorySizeModel.findByIdAndDelete(directoryDto);
  }

  async deleteDirectoryType(directoryDto: CreateDirectoryTypeDto[]) {
    return this.directoryTypeModel.findByIdAndDelete(directoryDto);
  }

  async deleteDirectorySeason(directoryDto: CreateDirectorySeasonDto[]) {
    return this.directorySeasonModel.findByIdAndDelete(directoryDto);
  }

  /*************   Get *************/

  async findDirectoryStyle(): Promise<DirectoryStyle[]> {
    return this.directoryStyleModel.find().exec();
  }
  async findDirectoryType(): Promise<DirectoryType[]> {
    return this.directoryTypeModel.find().exec();
  }
  async findDirectoryColor(): Promise<DirectoryColor[]> {
    return this.directoryColorModel.find().exec();
  }
  async findDirectorySeason(): Promise<DirectorySeason[]> {
    return this.directorySeasonModel.find().exec();
  }
}
