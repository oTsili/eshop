import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product-document.dto';
import { ProductTradeNumberService } from './product-trade-number.service';

import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    private readonly productTradeNumberService: ProductTradeNumberService,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

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
      if (parseInt(product.sales) > 0) {
        product.price = (
          parseInt(product.price) -
          parseInt(product.price) * (parseInt(product.sales) / 100)
        ).toString();
      }
    });
  }
}
