import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

// Nested Schema
@Schema()
export class WhishItem {
  @Prop()
  date: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product: Types.ObjectId;

  @Prop()
  quantity: number;
}
export const WhishItemSchema = SchemaFactory.createForClass(WhishItem);
