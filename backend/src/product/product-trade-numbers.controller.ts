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
import { ProductTradeNumberService } from './product-trade-number.service';

@Controller('product')
export class ProductsTradeNumberController {
  constructor(
    private readonly productTradeNumberService: ProductTradeNumberService,
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
      case 'color':
        console.log({ color: category });
        directoriesSaved =
          await this.productTradeNumberService.createDirectoryColor(
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

      case 'color':
        console.log({ color: category });
        directoryUpdated =
          await this.productTradeNumberService.updateDirectoryColor(id, row);
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

      case 'color':
        console.log({ color: category });
        directoryUpdated =
          await this.productTradeNumberService.deleteDirectoryColor(id);
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

    const trade_numbers = {
      seasons,
      colors,
      types,
      styles,
    };

    response.status(HttpStatus.OK).json(trade_numbers);
  }
}
