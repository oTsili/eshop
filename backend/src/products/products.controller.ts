import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
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
  async fetchColor(
    @Res() response,
    @Query('color') color: string,
    @Query('heel') heel: string,
    @Query('size') size: string,
    @Query('material') material: string,
    @Query('heel') sales: string,
    @Query('heel') price: string,
  ) {
    console.log({ color });
    console.log({ heel });
    console.log({ size });
    console.log({ material });
    if (color) {
      const products = await this.productService.findColor(color);
      return response.status(HttpStatus.OK).json({ products });
    }

    // if
  }

  // @Get('/query?')
  // async fetchHeel(@Res() response, @Query('heel') heel) {
  //   console.log(heel);
  //   const products = await this.productService.findHeel(heel);
  //   return response.status(HttpStatus.OK).json({ products });
  // }

  // @Get('/query?')
  // async fetchSize(@Res() response, @Query('size') size) {
  //   const products = await this.productService.findSize(size);
  //   return response.status(HttpStatus.OK).json({ products });
  // }

  // @Get('/query?')
  // async fetchMaterial(@Res() response, @Query('material') material) {
  //   const products = await this.productService.findMaterial(material);
  //   return response.status(HttpStatus.OK).json({ products });
  // }

  // @Get('/query?')
  // async fetchSales(@Res() response, @Query('sales') sales) {
  //   console.log(sales);
  //   const products = await this.productService.findSales(sales);
  //   return response.status(HttpStatus.OK).json({ products });
  // }

  // @Get('/query?')
  // async fetchPrice(@Res() response, @Query('price') price) {
  //   const products = await this.productService.findPrice(price);
  //   return response.status(HttpStatus.OK).json({ products });
  // }
}
