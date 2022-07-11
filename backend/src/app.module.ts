import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import * as path from 'path';

import { ProductsModule } from './products/products.module';
import { CarouselSlidesModule } from './carousel-slides/carousel-slides.module';
import { NavbarModule } from './navbar/navbar.module';
import { GridCategoriesModule } from './grid-categories/grid-categories.module';
import { FooterModule } from './footer/footer.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { TestController } from './test/test.controller';
import { ColorsModule } from './colors/colors.module';

@Module({
  // connect to the demo Database
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MongooseModule.forRoot(
      `${process.env['ME_CONFIG_MONGODB_URL']}/eshop?authSource=admin`,
    ),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-CA': 'fr',
        'en-*': 'en',
        'fr-*': 'fr',
        pt: 'pt-BR',
      },
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    ProductsModule,
    CarouselSlidesModule,
    NavbarModule,
    GridCategoriesModule,
    FooterModule,
    ColorsModule,
  ],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
