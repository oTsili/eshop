import { Injectable, NestMiddleware } from '@nestjs/common';
import { ProductTradeNumberService } from 'src/product/product-trade-number.service';

@Injectable()
export class TradeNumberFolderMiddleware implements NestMiddleware {
  constructor(
    private readonly productTradeNumberService: ProductTradeNumberService,
  ) {}

  async use(req, res, next) {
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
    console.log('inside middleware');

    // console.log(req.params);

    console.log(req.body);

    // console.log({ trade_numbers });
    next();
  }
}
