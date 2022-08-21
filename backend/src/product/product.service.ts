import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDirectoryColorDto } from './dto/create-directory-color.dto';
import { CreateDirectorySeasonDto } from './dto/create-directory-season.dto';
import { CreateDirectorySizeDto } from './dto/create-directory-size.dto';
import { CreateDirectoryStyleDto } from './dto/create-directory-style.dto';
import { CreateDirectoryTypeDto } from './dto/create-directory-type.dto';

import { CreateProductDto } from './dto/create-product-document.dto';
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
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
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

  async updateDirectoryStyle(directoryDto: CreateDirectoryStyleDto[]) {
    return this.directoryStyleModel.findByIdAndUpdate(directoryDto);
  }

  async updateDirectoryColor(directoryDto: CreateDirectoryColorDto[]) {
    return this.directoryColorModel.findByIdAndUpdate(directoryDto);
  }

  async updateDirectorySize(directoryDto: CreateDirectorySizeDto[]) {
    return this.directorySizeModel.findByIdAndUpdate(directoryDto);
  }

  async updateDirectoryType(directoryDto: CreateDirectoryTypeDto[]) {
    return this.directoryTypeModel.findByIdAndUpdate(directoryDto);
  }

  async updateDirectorySeason(directoryDto: CreateDirectorySeasonDto[]) {
    return this.directorySeasonModel.findByIdAndUpdate(directoryDto);
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

  /*************   Product *************/
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createProduct = new this.productModel(createProductDto);
    return createProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async countProducts(query) {
    return this.productModel.find(query).countDocuments();
  }

  async findFromQuery(query, pageSize, currentPage, sort, description_query) {
    return (
      this.productModel
        .find(query)
        // .find(description_query)
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .exec()
    );
  }

  async findPrice(price): Promise<Product[]> {
    return (
      this.productModel
        .find()
        .where('price')
        // .gte(minPrice)
        // .lte(maxPrice)
        .exec()
    );
  }

  async findSales(): Promise<Product[]> {
    return (
      this.productModel
        .find()
        .where('sales')
        .ne('')
        // .gte(minSales)
        // .lte(maxSales)
        .exec()
    );
  }

  /**
   * computes and save the after-sales special price
   * @param products the pre-fetched products (with )
   */
  computeSalesPrice(products: Product[]) {
    products.forEach((product: Product) => {
      if (product.sales) {
        product.price = (
          parseInt(product.price) -
          parseInt(product.price) * (parseInt(product.sales) / 100)
        ).toString();
      }
    });
  }
}
