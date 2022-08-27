import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
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
import { TradeNumberFolderMiddleware } from 'src/custom-middlewares/trade-number-folder.middleware';
import {
  DirectoryHeel,
  DirectoryHeelSchema,
} from './schemas/directory-heel.schema';
import {
  DirectoryMaterial,
  DirectoryMaterialSchema,
} from './schemas/directory-material.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    NestjsFormDataModule,

    /* Basic */
    MongooseModule.forFeature([
      { name: DirectorySeason.name, schema: DirectorySeasonSchema },
      { name: DirectoryColor.name, schema: DirectoryColorSchema },
      { name: DirectoryStyle.name, schema: DirectoryStyleSchema },
      { name: DirectorySize.name, schema: DirectorySizeSchema },
      { name: DirectoryType.name, schema: DirectoryTypeSchema },
      { name: DirectoryHeel.name, schema: DirectoryHeelSchema },
      { name: DirectoryMaterial.name, schema: DirectoryMaterialSchema },
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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TradeNumberFolderMiddleware)
      .forRoutes({ path: 'product', method: RequestMethod.POST });
  }
}
