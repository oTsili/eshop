import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type SupplierHistoryDocument = SupplyHistory & Document;

@Schema()
export class SupplyHistory {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  product: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplier: Types.ObjectId;

  @Prop()
  date: string;

  @Prop()
  quantity: string;

  @Prop()
  price: string;

  @Prop()
  country: string;
}

export const SupplierHistorySchema =
  SchemaFactory.createForClass(SupplyHistory);
