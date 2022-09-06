import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
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
          const path = `./static/images/suppliers/${req.body.tax_id_number}`;
          fs.mkdirSync(path, { recursive: true });
          return cb(null, path);
        },
        filename: (req, file, cb) => {
          const name = file.originalname.toLowerCase().split(' ').join('-');
          const extension = file.mimetype.split('/')[1];
          const filename = `${name.split('.')[0]}-${Date.now()}.${extension}`;

          req.session.path = `./static/images/suppliers/${req.body.tax_id_number}/${filename}`;

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

  @Get('')
  async fetchAll(@Res() res) {
    let suppliers = await this.supplierService.findAll();

    return res.status(HttpStatus.OK).json({ suppliers });
  }

  @Put(':id')
  async updateSupplier(@Res() res, @Body() body, @Param('id') id: string) {
    console.log(body);
    console.log(id);

    const updatedSupplier = this.supplierService.updateSupplier(id, body);

    return res.status(HttpStatus.OK).json({ updatedSupplier });
  }

  @Delete(':id')
  async deleteSupplier(@Res() res, @Body() body, @Param('id') id) {
    console.log(body);
    console.log(id);

    const deletedSupplier = this.supplierService.deleteSupplier(id);

    return res.status(HttpStatus.OK).json({ deletedSupplier });
  }
}
