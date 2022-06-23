import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    // Basic
    // MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),

    // With (pre/post hooks)middlewares
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
  providers: [ProductsService],
})
export class ProductsModule {}
