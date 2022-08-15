import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CartItem } from '../../cart/schemas/cart.schema';
import { Order } from './order.schema';
import { WhishlistItem } from '../../whishlist/schemas/whishlist.schema';

// Nested Schema
@Schema()
export class Account {
  @Prop()
  orders: Order[];

  @Prop()
  whishlist: WhishlistItem[];

  @Prop()
  cart: CartItem[];

  //   @Prop()
  //   profile: string;

  //   @Prop()
  //   addressbook: string;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
