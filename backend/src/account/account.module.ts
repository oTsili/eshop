import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from 'src/cart/cart.module';
import { CartService } from 'src/cart/cart.service';
import { CartItem, CartItemSchema } from 'src/cart/schemas/cart.schema';
import {
  WhishlistItem,
  WhishlistItemSchema,
} from 'src/whishlist/schemas/whishlist.schema';
import { WhishlistModule } from 'src/whishlist/whishlist.module';
import { WhishlistService } from 'src/whishlist/whishlist.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, WhishlistService, CartService],
  imports: [
    MongooseModule.forFeature([
      { name: WhishlistItem.name, schema: WhishlistItemSchema },
    ]),
    MongooseModule.forFeature([
      { name: CartItem.name, schema: CartItemSchema },
    ]),
  ],
})
export class AccountModule {}
