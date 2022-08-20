import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { MulterModule } from '@nestjs/platform-express';
import { extractFile } from 'src/custom-middlewares/multer.middleware';

@Module({
  imports: [
    // MulterModule.register({
    //   dest: './uploads',
    // }),

    /* Basic */
    // MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),

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
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(extractFile).forRoutes(ProductsController);
  // }
}
