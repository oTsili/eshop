import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  Session,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { MyNewFilesInterceptor } from 'src/interceptors/files.interceptor';
import { ProductService } from './product.service';
import * as fs from 'fs';
import { SupplierService } from 'src/supplier/supplier.service';
import { Supplier } from 'src/supplier/schemas/supplier.schema';

declare module 'express-session' {
  export interface SessionData {
    folder: { [key: string]: any };
    paths: string[];
    trade_number: string;
    path: string;
  }
}

@Controller('product')
export class ProductsController {
  constructor(
    private readonly productService: ProductService,
    private readonly supplierService: SupplierService,
  ) {}

  // @Post('upload/:folder')
  // @UseInterceptors(
  //   MyNewFilesInterceptor('photo[]', (ctx) => {
  //     // Get request from Context
  //     const req = ctx.switchToHttp().getRequest();
  //     // Return the options
  //     return {
  //       storage: diskStorage({
  //         destination: `./static/images/products/${req.params.folder}`,
  //         // tslint:disable-next-line: variable-name
  //         filename: (req, file, cb) => {
  //           const name = file.originalname.toLowerCase().split(' ').join('-');

  //           const extension = file.mimetype.split('/')[1];
  //           return cb(null, `${name}-${Date.now()}.${extension}`);
  //         },
  //       }),
  //     };
  //   }),
  // )
  // uploadSingle(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Res() res: Response,
  //   @Req() req: Request,
  //   @Body() body,
  // ) {
  //   for (let file of files) {
  //     console.log(file.filename);
  //   }
  //   // console.log(files);
  //   console.log(req);

  //   res.status(HttpStatus.OK).json({ files });
  // }

  @Post('')
  @UseInterceptors(
    // LoggingInterceptor,
    MyNewFilesInterceptor('photo[]', (ctx) => {
      // Get request from Context
      const req = ctx.switchToHttp().getRequest();

      // Return the options
      return {
        storage: diskStorage({
          destination: (req, file, cb) => {
            // console.log(req.session.folder);
            // const folder = req.session.folder;

            const path = `./static/images/products/${req.session.folder}`;
            fs.mkdirSync(path, { recursive: true });
            return cb(null, path);
          },
          // destination: `./static/images/products/${req.session.folder}`,
          // tslint:disable-next-line: variable-name
          filename: (req, file, cb) => {
            console.log({ session: req.session });
            const name = file.originalname.toLowerCase().split(' ').join('-');
            const extension = file.mimetype.split('/')[1];
            const filename = `${name.split('.')[0]}-${Date.now()}.${extension}`;

            req.session.paths.push(
              `/static/images/products/${req.session.folder}/${filename}`,
            );
            req.session.trade_number = `${req.session.folder}`;

            return cb(null, filename);
          },
        }),
      };
    }),
  )
  // @FormDataRequest()
  async createProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
    @Res() res: Response,
    @Body() body,
    @Session() session,
  ) {
    console.log('inside create product');
    // console.log(body);
    // for (let file of body.files) {
    //   console.log(file.filename);
    // }
    // console.log(files);
    console.log({ body });
    console.log({ session });

    let {
      src,
      altSrc,
      name,
      colors,
      main_color,
      size,
      price,
      material,
      sales,
      heel_height,
      season,
      style,
      type,
      description,
      supplier,
    } = body;

    const images = session.paths;
    console.log({ images });
    const trade_number = session.trade_number;

    let srcIndex = -1;
    let altSrcIndex = -1;
    images.forEach((image, index) => {
      // console.log(image, index);
      if (image.includes(src)) {
        srcIndex = index;
      }
      if (image.includes(altSrc)) {
        altSrcIndex = index;
      }
    });
    src = images[srcIndex];
    altSrc = images[altSrcIndex];

    let supplierObj: Supplier = await this.supplierService.findFromName(
      supplier,
    );

    console.log({ supplier: supplierObj });

    const product = {
      src,
      altSrc,
      name,
      colors,
      main_color,
      size,
      price,
      material,
      sales,
      heel_height,
      season,
      style,
      type,
      description,
      images,
      nominal_number: trade_number,
      supplier: supplierObj._id,
    };

    console.log({ product });

    const newProduct = await this.productService.create(product);

    return res.status(HttpStatus.CREATED).json({
      newProduct,
    });
  }

  // @Post()
  // async createProduct(@Res() response, @Body() product: Product) {
  //   const newProduct = await this.productService.create(product);
  //   return response.status(HttpStatus.CREATED).json({
  //     newProduct,
  //   });
  // }

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
    @Query('color') color: string,
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

    console.log({ query });

    // convert query property 'color' to 'colors',
    // since we changed the product object to have an array of colors instead of one color
    if (color) {
      query.colors = color;
      delete query.color;
    }

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
    // if (category) {
    //   query.category = category;
    // }
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
      // query.heel_height = { $gte: min, $lte: max };
      delete query['heel height'];
      query.heel_height = heel_height;
    }

    console.log({ query });

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
