import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from 'src/cart/cart.service';
import { CartItem, CartItemSchema } from 'src/cart/schemas/cart.schema';
import {
  WhishlistItem,
  WhishlistItemSchema,
} from 'src/whishlist/schemas/whishlist.schema';
import { WhishlistService } from 'src/whishlist/whishlist.service';
import { SharedService } from './shared.service';

@Module({
  providers: [SharedService, WhishlistService, CartService],
  imports: [
    MongooseModule.forFeature([
      { name: WhishlistItem.name, schema: WhishlistItemSchema },
    ]),
    MongooseModule.forFeature([
      { name: CartItem.name, schema: CartItemSchema },
    ]),
  ],
  exports: [SharedService],
})
export class SharedModule {}
