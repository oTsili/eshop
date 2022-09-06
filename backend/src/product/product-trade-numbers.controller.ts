import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { SupplierService } from 'src/supplier/supplier.service';
import { ProductTradeNumberService } from './product-trade-number.service';

@Controller('product')
export class ProductsTradeNumberController {
  constructor(
    private readonly productTradeNumberService: ProductTradeNumberService,
    private readonly supplierService: SupplierService,
  ) {}

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
        directoriesSaved =
          await this.productTradeNumberService.createDirectorySeason(
            directories,
          );

        break;
      case 'style':
        console.log({ style: category });
        directoriesSaved =
          await this.productTradeNumberService.createDirectoryStyle(
            directories,
          );

        break;
      case 'size':
        console.log({ size: category });
        directoriesSaved =
          await this.productTradeNumberService.createDirectorySize(directories);
        break;
      case 'type':
        console.log({ type: category });
        directoriesSaved =
          await this.productTradeNumberService.createDirectoryType(directories);

        break;
      case 'colors':
        console.log({ color: category });
        directoriesSaved =
          await this.productTradeNumberService.createDirectoryColor(
            directories,
          );
        break;
      case 'heel':
        console.log({ color: category });
        directoriesSaved =
          await this.productTradeNumberService.createDirectoryHeel(directories);
        break;
      case 'material':
        console.log({ color: category });
        directoriesSaved =
          await this.productTradeNumberService.createDirectoryMaterial(
            directories,
          );
        break;
    }

    return response.status(HttpStatus.CREATED).json({
      directoriesSaved,
    });
  }

  @Put('trade-number/:id/:category')
  async updateTradeNumDirectory(
    @Res() response,
    @Body() row,
    @Param('category') category,
    @Param('id') id,
  ) {
    console.log({ id, category });
    console.log({ row });

    let directoryUpdated;
    switch (category) {
      case 'season':
        console.log({ season: category });
        directoryUpdated =
          await this.productTradeNumberService.updateDirectorySeason(id, row);
        break;

      case 'style':
        console.log({ style: category });
        directoryUpdated =
          await this.productTradeNumberService.updateDirectoryStyle(id, row);
        break;

      case 'size':
        console.log({ size: category });
        directoryUpdated =
          await this.productTradeNumberService.updateDirectorySize(id, row);
        break;

      case 'type':
        console.log({ type: category });
        directoryUpdated =
          await this.productTradeNumberService.updateDirectoryType(id, row);
        break;

      case 'colors':
        console.log({ color: category });
        directoryUpdated =
          await this.productTradeNumberService.updateDirectoryColor(id, row);
        break;
      case 'heel':
        console.log({ color: category });
        directoryUpdated =
          await this.productTradeNumberService.updateDirectoryHeel(id, row);
        break;
      case 'material':
        console.log({ color: category });
        directoryUpdated =
          await this.productTradeNumberService.updateDirectoryMaterial(id, row);
        break;
    }

    return response.status(HttpStatus.CREATED).json({
      directoryUpdated,
    });
  }

  @Delete('trade-number/:id/:category')
  async deleteTradeNumDirectory(
    @Res() response,
    @Body() directories: Array<any>,
    @Param('category') category,
    @Param('id') id,
  ) {
    let directoryUpdated;
    console.log({ directories });
    console.log({ category });
    console.log({ id });
    switch (category) {
      case 'season':
        console.log({ season: category });
        directoryUpdated =
          await this.productTradeNumberService.deleteDirectorySeason(id);
        break;

      case 'style':
        console.log({ style: category });
        directoryUpdated =
          await this.productTradeNumberService.deleteDirectoryStyle(id);
        break;

      case 'size':
        console.log({ size: category });
        directoryUpdated =
          await this.productTradeNumberService.deleteDirectorySize(id);
        break;

      case 'type':
        console.log({ type: category });
        directoryUpdated =
          await this.productTradeNumberService.deleteDirectoryType(id);
        break;

      case 'colors':
        console.log({ color: category });
        directoryUpdated =
          await this.productTradeNumberService.deleteDirectoryColor(id);
        break;

      case 'heel':
        console.log({ color: category });
        directoryUpdated =
          await this.productTradeNumberService.deleteDirectoryHeel(id);
        break;
      case 'material':
        console.log({ color: category });
        directoryUpdated =
          await this.productTradeNumberService.deleteDirectoryMaterial(id);
        break;
    }

    return response.status(HttpStatus.OK).json({
      directoryUpdated,
    });
  }

  @Get('trade-number')
  async fetchTradeNumber(@Res() response) {
    let seasons = await this.productTradeNumberService.findDirectorySeason();
    let colors = await this.productTradeNumberService.findDirectoryColor();
    let types = await this.productTradeNumberService.findDirectoryType();
    let styles = await this.productTradeNumberService.findDirectoryStyle();
    let heels = await this.productTradeNumberService.findDirectoryHeel();
    let sizes = await this.productTradeNumberService.findDirectorySize();
    let materials =
      await this.productTradeNumberService.findDirectoryMaterial();
    let suppliers = await this.supplierService.findAll();

    const trade_numbers = {
      seasons,
      colors,
      types,
      styles,
      heels,
      sizes,
      materials,
      suppliers,
    };

    response.status(HttpStatus.OK).json(trade_numbers);
  }
}
