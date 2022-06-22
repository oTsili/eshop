import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  // connect to the demo Database
  imports: [
    // MongooseModule.forRoot('mongodb://root:example@mongo:27017/'),
    MongooseModule.forRoot(process.env['ME_CONFIG_MONGODB_URL']),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
