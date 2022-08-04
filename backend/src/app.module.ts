import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import * as path from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ProductsModule } from './products/products.module';
import { CarouselSlidesModule } from './carousel-slides/carousel-slides.module';
import { NavbarModule } from './navbar/navbar.module';
import { GridCategoriesModule } from './grid-categories/grid-categories.module';
import { FooterModule } from './footer/footer.module';
// import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { TestController } from './test/test.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  // connect to the demo Database
  imports: [
    ConfigModule.forRoot(),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'static'),
    // }),
    // A common technique to protect applications from brute-force attacks is rate-limiting. Implemented with @nestjs/throttler package
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MongooseModule.forRoot(
      `${process.env['ME_CONFIG_MONGODB_URL']}/eshop?authSource=admin`,
    ),
    // I18nModule.forRoot({
    //   fallbackLanguage: 'en',
    //   fallbacks: {
    //     'en-CA': 'fr',
    //     'en-*': 'en',
    //     'fr-*': 'fr',
    //     pt: 'pt-BR',
    //   },
    //   loaderOptions: {
    //     path: join(__dirname, '/i18n/'),
    //     watch: true,
    //   },
    //   resolvers: [
    //     { use: QueryResolver, options: ['lang'] },
    //     AcceptLanguageResolver,
    //   ],
    // }),
    ProductsModule,
    CarouselSlidesModule,
    NavbarModule,
    GridCategoriesModule,
    FooterModule,
    UserModule,
    AuthModule,
    // ColorsModule,
  ],
  controllers: [TestController],
  providers: [
    //  protection from brute-force attacks with rate-limiting. Implemented with @nestjs/throttler and Throttler guard on all routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
