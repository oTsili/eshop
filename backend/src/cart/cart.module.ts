import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartItem, CartItemSchema } from './schemas/cart.schema';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: CartItem.name, schema: CartItemSchema },
    ]),
  ],
  exports: [CartService],
})
export class CartModule {}
