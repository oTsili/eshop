import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/products/schemas/product.schema';

// Nested Schema
@Schema()
export class Order {
  @Prop()
  date: string;

  @Prop()
  product: Product;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
