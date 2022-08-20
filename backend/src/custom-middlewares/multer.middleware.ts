// import multer from 'multer';
import { NextFunction, Request } from 'express';
import multer from 'multer';
import { MimeValidationError } from 'src/custom-errors/invalid-mime.error';

const storage = (mimeTypeMap: any, folder: any) => {
  console.log('paokara!!!!!');
  return multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: { (error: Error | null, destination: string): void },
    ) => {
      // throw a specific error from the middlewares of common library I have published
      const isValid = mimeTypeMap[file.mimetype]!;
      let error = new MimeValidationError();
      if (isValid) {
        error = null as any;
      }
      cb(error, folder);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: { (error: Error | null, destination: string): void },
    ) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = mimeTypeMap[file.mimetype];
      cb(null, `${name}-${Date.now()}.${ext}`);
    },
  });
};

const extractFile = (
  req: Request,
  res: Response,
  next: NextFunction,
  // MIME_TYPE_MAP: { [key: string]: any },
  // folder: string,
  // formName: string,
) => {
  console.log(req.headers.mime_type_map);
  const mime_types = JSON.parse(req.headers.mime_type_map as string);

  multer({
    storage: storage(mime_types, req.headers.folder as string),
  }).single(req.headers.fileKey as string);
};

export { extractFile };
// export function extractFile(req: Request, res: Response, next: NextFunction) {
//   console.log(`Request...`);
//   next();
// };
