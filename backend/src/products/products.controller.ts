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

    @Query('heelHeight') heelHeight: string,
    @Query('sales') sales: string,
    @Query('price') price: string,
  ) {
    let query = request.query;
    if (sales) {
      const [min, max] = sales.split('-').map((num: string) => parseInt(num));
      query.sales = { $gte: min, $lte: max };
    }
    if (price) {
      const [min, max] = price.split('-').map((num: string) => parseInt(num));
      query.price = { $gte: min, $lte: max };
    }
    if (heelHeight) {
      const [min, max] = heelHeight
        .split('-')
        .map((num: string) => parseInt(num));
      query.heelHeight = { $gte: min, $lte: max };
    }

    const products = await this.productService.findFromQuery(query);
    return response.status(HttpStatus.OK).json({ products });
  }
}
