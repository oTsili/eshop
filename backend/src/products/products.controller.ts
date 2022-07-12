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
    let products = await this.productService.findAll();

    this.productService.computeSalesPrice(products);
    console.log(products);

    return response.status(HttpStatus.OK).json({ products });
  }

  @Get('/query?')
  async fetchFromQuery(
    @Res() response,
    @Req() request,

    @Query('heel_height') heel_height: string,
    @Query('sales') sales: string,
    @Query('price') price: string,
  ) {
    /**
     * for the query parameters heel_height, sales and price, which contain
     * non-numeral characters, refactor mongodb queryies, by stripping those
     * non-numeral characters, and parsing the strings to numbers
     */
    let query = request.query;
    console.log({ query });
    if (sales) {
      const [min, max] = sales
        .split('-')
        .map((num: string) => parseInt(num.replace(/\D/g, '')));
      query.sales = { $gte: min, $lte: max };
    }
    if (price) {
      const [min, max] = price
        .split('-')
        .map((num: string) => parseInt(num.replace(/\D/g, '')));
      query.price = { $gte: min, $lte: max };
    }
    if (heel_height) {
      const [min, max] = heel_height
        .split('-')
        .map((num: string) => parseInt(num.replace(/\D/g, '')));

      console.log(min, max);
      query.heel_height = { $gte: min, $lte: max };
    }

    const products = await this.productService.findFromQuery(query);

    this.productService.computeSalesPrice(products);
    console.log(products);
    return response.status(HttpStatus.OK).json({ products });
  }
}
