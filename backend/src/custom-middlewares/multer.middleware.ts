// import multer from 'multer';
import { NextFunction, Request } from 'express';
import multer from 'multer';
import { diskStorage } from 'multer';
import { MimeValidationError } from 'src/custom-errors/invalid-mime.error';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FilesMiddleware implements NestMiddleware {
  // private storage = {...};

  async use(req, res, next) {
    const upload = multer({
      storage: diskStorage({
        destination: `./static/images/products/${req.params.folder}`,
        // tslint:disable-next-line: variable-name
        filename: (req, file, cb) => {
          const name = file.originalname.toLowerCase().split(' ').join('-');

          const extension = file.mimetype.split('/')[1];
          return cb(null, `${name}-${Date.now()}.${extension}`);
        },
      }),
    });
    // wait until upload has finished
    await new Promise<void>((resolve, reject) => {
      upload.array('files')(req, res, (err) => (err ? reject(err) : resolve()));
    });
    // Then you can access the new file names
    console.log(req.files.map((file) => file.filename));
    return next();
  }
}

// @Injectable()
// export class extractFile implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(`Request...`);
//     multer({
//       storage: diskStorage({
//         destination: `./static/images/products/${req.params.folder}`,
//         // tslint:disable-next-line: variable-name
//         filename: (req, file, cb) => {
//           const name = file.originalname.toLowerCase().split(' ').join('-');

//           const extension = file.mimetype.split('/')[1];
//           return cb(null, `${name}-${Date.now()}.${extension}`);
//         },
//       }),
//     });
//     next();
//   }
// }
