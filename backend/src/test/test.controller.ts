import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('test')
export class TestController {
  // @Get()
  // async getHelloHello(@I18n() i18n: I18nContext, @Param('lang') lang: string) {
  //   console.log('paok');
  //   return await i18n.t('test.PRODUCT', { args: { name: 'Toon' }, lang: lang });
  // }
  @Get(':lang')
  async getHelloTranslated(
    @I18n() i18n: I18nContext,
    @Param('lang') lang: string,
  ) {
    console.log('paok');
    return await i18n.t('test.PRODUCT', { args: { name: 'Toon' }, lang: lang });
  }
  @Get('')
  async getHello(@Req() req, @Res() res) {
    console.log('paok');
    console.log(req);
    console.log(res);
    return await res.status(HttpStatus.OK).json({ message: 'ok' });
  }
}
