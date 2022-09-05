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
        console.log({ name, value });
        if (name === 'tax_id_number') req.session.folder = value;

        console.log({ folder: req.session.folder });
      });
      req.busboy.on('file', (name, file, info) => {
        // filename = name;
        //  console.log('Uploading: ' + filename);
        //  fstream = fs.createWriteStream(__dirname + '/public/img/' + filename);
        file.on('data', (chunk) => {
          //  fstream.write(chunk);
          // console.log(chunk);
        });
        file.on('end', () => {
          //  fstream.end();
          console.log('File [' + name + '] Finished sucessfully');
        });
        file.on('error', (err) => {
          console.log('fstream error' + err);
          filename = null;
          file.unpipe();
        });
        // console.log({ info });
        // console.log({ name });
        // console.log({ file });
        // filename = name;
        // filename = name;
      });
      // req.unpipe();
      console.log('paok');
      req.pipe(req.busboy);
      // console.log({ filename });
      // if (filename !== '') {
      //   req.pipe(req.busboy);
      // } else {
      //   req.unpipe();
      // }
    }

    req.session.path = '';

    next();
  }
}
