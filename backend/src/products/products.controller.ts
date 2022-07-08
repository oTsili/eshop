import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { request } from 'http';
import { getMaxListeners } from 'process';
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

  @Get('/query?')
  async fetchFromQuery(
    @Res() response,
    @Req() request,

    @Query('sales') sales: string,
    @Query('price') price: string,
  ) {
    let query = request.query;
    if (sales && price) {
      const [minPrice, maxPrice] = price.split('-');
      query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
      const [minSales, maxSales] = price.split('-');
      query.price = { $gte: parseInt(minSales), $lte: parseInt(maxSales) };
    } else if (sales) {
      const [min, max] = sales.split('-');
      query.sales = { $gte: parseInt(min), $lte: parseInt(max) };
    } else if (price) {
      const [min, max] = price.split('-');
      query.price = { $gte: parseInt(min), $lte: parseInt(max) };
    }
    const products = await this.productService.findFromQuery(query);
    return response.status(HttpStatus.OK).json({ products });
  }
}
