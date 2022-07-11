import { Controller, Get, Param } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('test')
export class TestController {
  @Get()
  async getHello(@I18n() i18n: I18nContext, @Param('lang') lang: string) {
    console.log('paok');
    return await i18n.t('test.PRODUCT', { args: { name: 'Toon' }, lang: lang });
  }
  @Get(':lang')
  async getHelloTranslated(
    @I18n() i18n: I18nContext,
    @Param('lang') lang: string,
  ) {
    console.log('paok');
    return await i18n.t('test.PRODUCT', { args: { name: 'Toon' }, lang: lang });
  }
}
