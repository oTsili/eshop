import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ProductTradeNumberService } from 'src/product/product-trade-number.service';
// const busboy = require('busboy');
// import * as busboy from 'busboy';

@Injectable()
// @FormDataRequest()
export class TradeNumberFolderMiddleware implements NestMiddleware {
  constructor(
    private readonly productTradeNumberService: ProductTradeNumberService,
  ) {}

  async use(req, res: Response, next: NextFunction) {
    console.log('Middleware...');
    let flagFileName = '';

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
    // console.log({ seasons });

    const categories = Object.keys(trade_numbers).map((el) => {
      if (el !== 'colors') {
        return el.slice(0, -1);
      } else {
        return el;
      }
    });

    // console.log({ categories });

    let folder = 's';

    if (req.busboy) {
      req.busboy.on('field', (name, value, info) => {
        // console.log(name, value);

        categoriesArray.forEach((element, index) => {
          element.forEach((el) => {
            if (el.description === value && name === categories[index]) {
              console.log(el.description, el.code);
              folder = folder + el.code;
            }
          });
        });
        req.session.folder = folder;

        // console.log({ folder });
      });
      // req.busboy.on('file', (name, file, info) => {
      //   // console.log(name)
      //   flagFileName = name;
      // });

      // if (flagFileName)
      req.pipe(req.busboy);
    }

    req.session.paths = [];

    next();
  }
}
