import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/products/schemas/product.schema';

// Nested Schema
@Schema()
export class CartItem {}
export const CartItemSchema = SchemaFactory.createForClass(CartItem);
