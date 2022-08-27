import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SupplierService } from './supplier.service';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log({ myfolder: req.session.folder });
          // const folder = req.session.folder;

          const path = `./static/images/suppliers/${req.session.folder}`;
          fs.mkdirSync(path, { recursive: true });
          return cb(null, path);
        },
        // destination: `./static/images/products/${req.session.folder}`,
        // tslint:disable-next-line: variable-name
        filename: (req, file, cb) => {
          //   console.log({ session: req.session });
          const name = file.originalname.toLowerCase().split(' ').join('-');
          const extension = file.mimetype.split('/')[1];
          const filename = `${name.split('.')[0]}-${Date.now()}.${extension}`;

          req.session.path = `./static/images/suppliers/${req.session.folder}/${filename}`;

          return cb(null, filename);
        },
      }),
    }),
  )
  async createSupplier(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @Req() req: Request,
    @Res() res: Response,
    @Session() session,
  ) {
    // console.log({ file });
    // console.log({ body });
    // console.log({ session });

    const {
      company_name,
      firstname,
      lastname,
      tax_id_number,
      phone,
      address,
      city,
      country,
      id,
    } = body;

    const photo = session.path;

    const supplier = {
      company_name,
      firstname,
      lastname,
      tax_id_number,
      phone,
      address,
      city,
      country,
      id,
      photo,
    };

    const newSupplier = await this.supplierService.create(supplier);

    return res.status(HttpStatus.CREATED).json(newSupplier);
  }
}
