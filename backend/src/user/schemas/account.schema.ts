import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { WhishItem } from './whishlist.schema';

// Nested Schema
@Schema()
export class Account {
  @Prop()
  orders: Order[];

  @Prop()
  whishlist: WhishItem[];

  //   @Prop()
  //   profile: string;

  //   @Prop()
  //   addressbook: string;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
