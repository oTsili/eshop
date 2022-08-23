import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { MulterModule } from '@nestjs/platform-express';
import {
  DirectoryColor,
  DirectoryColorSchema,
} from './schemas/directory-color.schema';
import {
  DirectoryStyle,
  DirectoryStyleSchema,
} from './schemas/directory-style.schema';
import {
  DirectorySize,
  DirectorySizeSchema,
} from './schemas/directory-size.schema';
import {
  DirectoryType,
  DirectoryTypeSchema,
} from './schemas/directory-type.schema';
import {
  DirectorySeason,
  DirectorySeasonSchema,
} from './schemas/directory-season.schema';
import { ProductsTradeNumberController } from './product-trade-numbers.controller';
import { ProductTradeNumberService } from './product-trade-number.service';

@Module({
  imports: [
    // MulterModule.register({
    //   dest: './uploads',
    // }),

    /* Basic */
    MongooseModule.forFeature([
      { name: DirectorySeason.name, schema: DirectorySeasonSchema },
      { name: DirectoryColor.name, schema: DirectoryColorSchema },
      { name: DirectoryStyle.name, schema: DirectoryStyleSchema },
      { name: DirectorySize.name, schema: DirectorySizeSchema },
      { name: DirectoryType.name, schema: DirectoryTypeSchema },
    ]),

    /* With (pre/post hooks)middlewares */
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          schema.pre('save', function () {
            console.log('Hello from pre save');
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [ProductsController, ProductsTradeNumberController],
  providers: [ProductService, ProductTradeNumberService],
})
export class ProductModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(extractFileOld).forRoutes(ProductsController);
  // }
}
