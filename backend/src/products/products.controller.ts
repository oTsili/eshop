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

    // compute/update prices from sales
    this.productService.computeSalesPrice(products);

    const totalProducts = products.length;
    const message = 'products fetched';

    return response
      .status(HttpStatus.OK)
      .json({ message, products, totalProducts });
  }

  @Get('sales')
  async fetchSales(@Res() response) {
    let products = await this.productService.findSales();

    this.productService.computeSalesPrice(products);

    return response.status(HttpStatus.OK).json({ products });
  }

  @Get('/query?')
  async fetchFromQuery(
    @Res() response,
    @Req() request,

    @Query('pageSize') pageSize: number,
    @Query('currentPage') currentPage: number,
    @Query('sort') sort: string,
    @Query('description') description: string,

    @Query('heel height') heel_height: string,
    @Query('sales') sales: string,
    @Query('price') price: string,
  ) {
    let query = request.query;
    let description_query;
    /**
     * for the query parameters heel_height, sales and price, which contain
     * non-numeral characters, refactor mongodb queryies, by stripping those
     * non-numeral characters, and parsing the strings to numbers
     */
    console.log({ pageSize }, { currentPage }, { sort }, { description });

    console.log({ query });

    if (description) {
      query.description = { $regex: description, $options: 'i' };
      console.log(query.description);

      // description_query = {
      //   $description: {
      //     $search: { $regex: description, $options: 'i' },
      //     $diacriticSensitive: false,
      //     $caseSensitive: false,
      //   },
      // };

      // delete query.description;
    }
    if (description === '') {
      delete query.description;
    }
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

      console.log({ min }, { max });
      query.heel_height = { $gte: min, $lte: max };
    }

    // get the products
    const products = await this.productService.findFromQuery(
      query,
      pageSize,
      currentPage,
      sort,
      description,
    );

    console.log(products);

    // get the number of the products, so that the paginator is informed (e.g. page 1 of ...._)
    const totalProducts = await this.productService.countProducts(query);

    // update the value attribute with respect the sales attribute if there is in each product
    this.productService.computeSalesPrice(products);

    // return the response to the frontend
    return response
      .status(HttpStatus.OK)
      .json({ message: 'products fetched', products, totalProducts });
  }
}
