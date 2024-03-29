import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import * as path from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ProductModule } from './product/product.module';
import { CarouselSlidesModule } from './carousel-slides/carousel-slides.module';
import { NavbarModule } from './navbar/navbar.module';
import { GridCategoriesModule } from './grid-categories/grid-categories.module';
import { FooterModule } from './footer/footer.module';
// import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { TestController } from './test/test.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { WhishlistModule } from './whishlist/whishlist.module';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { SupplyHistoryModule } from './supply-history/supply-history.module';
import { CustomerHistoryModule } from './customer-history/customer-history.module';
import { SupplierModule } from './supplier/supplier.module';

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
      limit: 1000,
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
    SupplierModule,
    ProductModule,
    CarouselSlidesModule,
    NavbarModule,
    GridCategoriesModule,
    FooterModule,
    UserModule,
    AuthModule,
    CartModule,
    WhishlistModule,
    AccountModule,
    SharedModule,
    SupplyHistoryModule,
    CustomerHistoryModule,
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
