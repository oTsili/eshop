import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FormDataRequest } from 'nestjs-form-data';
import { MyNewFilesInterceptor } from 'src/interceptors/files.interceptor';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller('product')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload/:folder')
  @UseInterceptors(
    MyNewFilesInterceptor('photo[]', (ctx) => {
      // Get request from Context
      const req = ctx.switchToHttp().getRequest();
      // Return the options
      return {
        storage: diskStorage({
          destination: `./static/images/products/${req.params.folder}`,
          // tslint:disable-next-line: variable-name
          filename: (req, file, cb) => {
            const name = file.originalname.toLowerCase().split(' ').join('-');

            const extension = file.mimetype.split('/')[1];
            return cb(null, `${name}-${Date.now()}.${extension}`);
          },
        }),
      };
    }),
  )
  uploadSingle(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() res: Response,
    @Body() body,
  ) {
    for (let file of files) {
      console.log(file.filename);
    }
    // console.log(files);
    console.log(body.email);

    res.status(HttpStatus.OK).json({ files });
  }

  @Post('trade-number/:category')
  async createTradeNumDirectory(
    @Res() response,
    @Body() directories: Array<any>,
    @Param('category') category,
  ) {
    let directoriesSaved = [];
    switch (category) {
      case 'season':
        console.log({ season: category });
        directoriesSaved = await this.productService.createDirectorySeason(
          directories,
        );

        break;
      case 'style':
        console.log({ style: category });
        directoriesSaved = await this.productService.createDirectoryStyle(
          directories,
        );

        break;
      case 'size':
        console.log({ size: category });
        directoriesSaved = await this.productService.createDirectorySize(
          directories,
        );
        break;
      case 'type':
        console.log({ type: category });
        directoriesSaved = await this.productService.createDirectoryType(
          directories,
        );

        break;
      case 'color':
        console.log({ color: category });
        directoriesSaved = await this.productService.createDirectoryColor(
          directories,
        );
        break;
    }

    return response.status(HttpStatus.CREATED).json({
      directoriesSaved,
    });
  }

  @Put('trade-number/:category')
  async updateTradeNumDirectory(
    @Res() response,
    @Body() directories: Array<any>,
    @Param('category') category,
  ) {
    let directoryUpdated;
    switch (category) {
      case 'season':
        console.log({ season: category });
        directoryUpdated = await this.productService.updateDirectorySeason(
          directories,
        );
        break;

      case 'style':
        console.log({ style: category });
        directoryUpdated = await this.productService.updateDirectoryStyle(
          directories,
        );
        break;

      case 'size':
        console.log({ size: category });
        directoryUpdated = await this.productService.updateDirectorySize(
          directories,
        );
        break;

      case 'type':
        console.log({ type: category });
        directoryUpdated = await this.productService.updateDirectoryType(
          directories,
        );
        break;

      case 'color':
        console.log({ color: category });
        directoryUpdated = await this.productService.updateDirectoryColor(
          directories,
        );
        break;
    }

    return response.status(HttpStatus.CREATED).json({
      directoryUpdated,
    });
  }

  @Get('trade-number')
  async fetchTradeNumber(@Res() response) {
    let seasons = await this.productService.findDirectorySeason();
    let colors = await this.productService.findDirectoryColor();
    let types = await this.productService.findDirectoryType();
    let styles = await this.productService.findDirectoryStyle();

    const trade_numbers = {
      seasons,
      colors,
      types,
      styles,
    };

    response.status(HttpStatus.OK).json(trade_numbers);
  }

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
    // console.log({ pageSize }, { currentPage }, { sort }, { description });

    // console.log({ query });

    if (description) {
      query.description = { $regex: description, $options: 'i' };
      // console.log(query.description);

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

      // console.log({ min }, { max });
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

    // console.log(products);

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
