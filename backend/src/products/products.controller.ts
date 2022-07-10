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

    this.computeSalesPrice(products);
    console.log(products);

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
    /**
     * for the query parameters heelHeight, sales and price, which contain
     * non-numeral characters, refactor mongodb queryies, by stripping those
     * non-numeral characters, and parsing the strings to numbers
     */
    let query = request.query;
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
    if (heelHeight) {
      const [min, max] = heelHeight
        .split('-')
        .map((num: string) => parseInt(num.replace(/\D/g, '')));

      console.log(min, max);
      query.heelHeight = { $gte: min, $lte: max };
    }

    const products = await this.productService.findFromQuery(query);

    this.computeSalesPrice(products);
    console.log(products);
    return response.status(HttpStatus.OK).json({ products });
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
