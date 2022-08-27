import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
// @FormDataRequest()
export class SupplierFolderMiddleware implements NestMiddleware {
  async use(req, res: Response, next: NextFunction) {
    console.log('Middleware...');
    let filename = '';

    if (req.busboy) {
      req.busboy.on('field', (name, value, info) => {
        console.log(name, value);
        if (name === 'tax_id_number') req.session.folder = value;

        console.log({ folder: req.session.folder });
      });
      req.busboy.on('file', (name, file, info) => {
        console.log(name);
        filename = name;
      });

      // console.log({ filename });
      // if (filename)
      req.pipe(req.busboy);
    }

    req.session.path = '';

    next();
  }
}
