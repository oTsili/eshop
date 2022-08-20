import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type CustomerHistoryDocument = CustomerHistory & Document;

@Schema()
export class CustomerHistory {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop()
  quantity: string;

  @Prop()
  date: string;
}

export const CustomerHistorySchema =
  SchemaFactory.createForClass(CustomerHistory);
