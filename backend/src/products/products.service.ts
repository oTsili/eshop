import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product-document.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createProduct = new this.productModel(createProductDto);
    return createProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findHeel(heel): Promise<Product[]> {
    return this.productModel.find({ heel }).exec();
  }

  async findColor(color): Promise<Product[]> {
    return this.productModel.find({ color }).exec();
  }

  async findSize(size): Promise<Product[]> {
    return this.productModel.find({ size }).exec();
  }

  async findMaterial(material): Promise<Product[]> {
    return this.productModel.find({ material }).exec();
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

  async findSales(sales): Promise<Product[]> {
    return (
      this.productModel
        .find({ in_sales: true })
        .where('sales')
        // .gte(minSales)
        // .lte(maxSales)
        .exec()
    );
  }
}
