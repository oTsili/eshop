import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async createProduct(@Res() response, @Body() product: Product) {
    const newProduct = await this.productService.create(product);
    return response.status(HttpStatus.CREATED).json({
      newProduct,
    });
  }

  @Get('')
  async fetchAll(@Res() response) {
    const products = await this.productService.findAll();
    return response.status(HttpStatus.OK).json({ products });
  }

  @Get('sales')
  async fetchSales(@Res() response) {
    const products_with_sales = await this.productService.findSales();
    return response.status(HttpStatus.OK).json({ products_with_sales });
  }
}
