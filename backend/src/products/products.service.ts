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

  async findFromQuery(query) {
    return this.productModel.find(query).exec();
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
