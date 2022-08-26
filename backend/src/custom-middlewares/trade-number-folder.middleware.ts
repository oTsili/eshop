import { Injectable, NestMiddleware, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import e, { Request, Response, NextFunction } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { ProductTradeNumberService } from 'src/product/product-trade-number.service';
import { Product } from 'src/product/schemas/product.schema';
const busboy = require('busboy');

@Injectable()
// @FormDataRequest()
export class TradeNumberFolderMiddleware implements NestMiddleware {
  constructor(
    private readonly productTradeNumberService: ProductTradeNumberService,
  ) {}

  async use(req, res: Response, next: NextFunction) {
    console.log('Request...');

    let seasons = await this.productTradeNumberService.findDirectorySeason();
    let colors = await this.productTradeNumberService.findDirectoryColor();
    let types = await this.productTradeNumberService.findDirectoryType();
    let sizes = await this.productTradeNumberService.findDirectorySize();
    let heel_heights = await this.productTradeNumberService.findDirectoryHeel();
    let styles = await this.productTradeNumberService.findDirectoryStyle();
    let materials =
      await this.productTradeNumberService.findDirectoryMaterial();

    const trade_numbers = {
      seasons,
      colors,
      types,
      styles,
      sizes,
      heel_heights,
      materials,
    };
    const categoriesArray = [
      seasons,
      colors,
      types,
      styles,
      sizes,
      heel_heights,
      materials,
    ];
    console.log({ seasons });

    const categories = Object.keys(trade_numbers).map((el) => {
      if (el !== 'colors') {
        return el.slice(0, -1);
      } else {
        return el;
      }
    });

    // const values = Object.values(trade_numbers);
    categories.map;
    console.log({ categories });

    // console.log({ values });

    let folder = 's';

    if (req.busboy) {
      req.busboy.on('field', (name, value, info) => {
        console.log(name, value);

        categoriesArray.forEach((element, index) => {
          element.forEach((el) => {
            if (el.description === value && name === categories[index]) {
              console.log(el.code);
              folder = folder + el.code;
            }
          });
        });
        req.session.folder = folder;

        console.log({ folder });
      });
      req.busboy.on('file', (name, file, info) => {
        console.log(name);
      });
      req.pipe(req.busboy);
    }

    // console.log({ body: req.busboy });
    // const bb = busboy({ headers: req.headers });

    // bb.on('field', (name, value, info) => {
    //   console.log(name);
    // });

    // const code1 = seasons.find((s) => s.description === season).code;

    // console.log(code1);

    next();
  }
}
// @Injectable()
// export class TradeNumberFolderMiddleware implements NestMiddleware {
//   constructor(
//     private readonly productTradeNumberService: ProductTradeNumberService,
//   ) {}

//   async use(req, res, next) {
//     let seasons = await this.productTradeNumberService.findDirectorySeason();
//     let colors = await this.productTradeNumberService.findDirectoryColor();
//     let types = await this.productTradeNumberService.findDirectoryType();
//     let styles = await this.productTradeNumberService.findDirectoryStyle();

//     const trade_numbers = {
//       seasons,
//       colors,
//       types,
//       styles,
//     };
//     console.log('inside middleware');

//     req.session.folder = 'paok';
//     console.log(req.body);

//     next();
//   }
// }
