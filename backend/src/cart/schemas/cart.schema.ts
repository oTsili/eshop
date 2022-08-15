import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type CartItemDocument = CartItem & Document;

// Nested Schema
@Schema()
export class CartItem {
  @Prop()
  date: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product: Types.ObjectId;

  @Prop()
  quantity: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}
export const CartItemSchema = SchemaFactory.createForClass(CartItem);
