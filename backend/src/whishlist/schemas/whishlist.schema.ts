import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type WhishlistItemDocument = WhishlistItem & Document;

// Nested Schema
@Schema()
export class WhishlistItem {
  @Prop()
  date: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product: Types.ObjectId;

  @Prop()
  quantity: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}
export const WhishlistItemSchema = SchemaFactory.createForClass(WhishlistItem);
