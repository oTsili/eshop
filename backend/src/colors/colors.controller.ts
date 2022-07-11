import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ColorsService } from './colors.service';
import { Colors } from './schemas/colors.schema';

@Controller('colors')
export class ColorsController {
  constructor(private colorService: ColorsService) {}

  @Put()
  async pushColorToArray(@Res() response, @Body() color: { color: string }) {
    const document = await this.colorService.findAll();
    if (!document.colors.includes(color.color)) {
      document.colors.push(color.color);
      const newColorsArray = await this.colorService.updateArray(
        document._id,
        document,
      );
      return response.status(HttpStatus.OK).json({
        newColorsArray,
      });
    } else {
      return response.status(HttpStatus.NOT_MODIFIED).json({
        message: 'color already exists',
      });
    }
  }

  @Post()
  async createColorsArray(@Res() response, @Body() colors: Colors) {
    const newColorsArray = await this.colorService.createArray(colors);
    return response.status(HttpStatus.CREATED).json({
      newColorsArray,
    });
  }

  @Get('')
  async fetchAll(@Res() response) {
    let document = await this.colorService.findAll();

    return response.status(HttpStatus.OK).json({ document });
  }

  @Get(':lang')
  async fetchAllTranslated(
    @Res() response,
    @I18n() i18n: I18nContext,
    @Param('lang') lang: string,
  ) {
    let document = await this.colorService.findAll();

    const colorArray: string[] = [];
    for (let color of document.colors) {
      let translatedColor = await i18n.t(`colors.${color}`, {
        lang: lang,
      });
      colorArray.push(translatedColor);
    }

    console.log(colorArray);

    return response.status(HttpStatus.OK).json({ colorArray });
  }

  // @Get()
  // async getColors(@I18n() i18n: I18nContext, @Param('lang') lang: string) {
  //   return await i18n.t('test.PRODUCT', { args: { name: 'Toon' }, lang: lang });
  // }
}
